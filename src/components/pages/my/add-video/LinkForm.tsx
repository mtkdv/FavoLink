import { useId } from "react";
import { z } from "zod";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { SlMagnifierAdd } from "react-icons/sl";
import { RiShareBoxLine } from "react-icons/ri";

import { Schema } from "#/pages/my/add-video";
import { getYouTubeVideoIdFromUrl, listChannels, listVideos } from "#/utils";
import { youtube } from "#/const";

const schemaVF = z.object({
  url: z
    .string()
    .superRefine((value, ctx) => {
      if (value !== "" && !value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "YouTube動画のURLを貼ってください。",
        });
      }
    })
    .transform((url, ctx) => {
      const videoId = getYouTubeVideoIdFromUrl(url);
      if (videoId === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "YouTube動画のURLを貼ってください。",
        });
        return z.NEVER;
      }
      return videoId;
    }),
});

type SchemaVF = z.infer<typeof schemaVF>;

type Props = {
  setValue: UseFormSetValue<Schema>;
  categoryIndex: number;
  linkIndex: number;
  setHasValues: React.Dispatch<React.SetStateAction<boolean>>;
  removeVideo: (index: number) => void;
};

export const LinkForm: React.FC<Props> = ({
  setValue,
  categoryIndex,
  linkIndex,
  setHasValues,
  removeVideo,
}) => {
  const linkInputId = useId();
  const linkFormId = useId();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SchemaVF>();

  const onUpdate: SubmitHandler<SchemaVF> = async (data) => {
    // console.log("update data:", data);
    // FIXME: formのネストを解消し、onSubmitを利用できるようになったため、parseを用いずにzod schemaにvalidationを記述する。
    let parsedData: SchemaVF | undefined;
    try {
      parsedData = schemaVF.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach(({ code, message }) => {
          setError("url", {
            type: code,
            message,
          });
        });
      }
    }
    if (parsedData === undefined) return;
    const videoId = parsedData.url;

    /** YouTube Data API */
    const listVideosResponse = await listVideos(videoId);
    if (listVideosResponse.type === "error") {
      toast.error(listVideosResponse.message);
      return;
    }
    const { channelId, title, thumbnailUrl, channelTitle } = listVideosResponse;

    const listChannelsResponse = await listChannels(channelId);
    if (listChannelsResponse.type === "error") {
      toast.error(listChannelsResponse.message);
      return;
    }
    const { channelThumbnailUrl } = listChannelsResponse;

    // const updateData = {
    //   videoId,
    //   title,
    //   thumbnailUrl,
    // };
    // update(index, updateData);
    setValue(
      `videos.${categoryIndex}.categoryLinks.${linkIndex}.videoId`,
      videoId
    );
    setValue(`videos.${categoryIndex}.categoryLinks.${linkIndex}.title`, title);
    setValue(
      `videos.${categoryIndex}.categoryLinks.${linkIndex}.thumbnailUrl`,
      thumbnailUrl
    );
    setValue(
      `videos.${categoryIndex}.categoryLinks.${linkIndex}.channelId`,
      channelId
    );
    setValue(
      `videos.${categoryIndex}.categoryLinks.${linkIndex}.channelTitle`,
      channelTitle
    );
    setValue(
      `videos.${categoryIndex}.categoryLinks.${linkIndex}.channelThumbnailUrl`,
      channelThumbnailUrl
    );

    setHasValues(true);
  };

  return (
    <>
      {/* Remove Video-URL Form */}
      <button
        type="button"
        onClick={() => removeVideo(linkIndex)}
        className="group/remove absolute right-2 top-2 outline-none"
      >
        <IoMdClose
          size={20}
          className="text-stone-400 opacity-0 transition duration-300 group-hover/video-item:opacity-100 group-focus-visible/remove:opacity-100 group-[:is(:hover,:focus-visible)]/remove:text-red-400"
        />
      </button>

      {/* Video-URL Form */}
      <form
        onSubmit={handleSubmit(onUpdate)}
        id={linkFormId}
        className="flex h-full w-full flex-col justify-center space-y-2 px-3"
      >
        {/* Video-URL Label, a */}
        <div className="flex w-fit space-x-2">
          <label
            // htmlFor={`url-input-${categoryIndex}-${linkIndex}`}
            htmlFor={linkInputId}
            className="ml-1 w-fit text-xs font-semibold tracking-wide text-stone-600"
          >
            YouTube Video URL
          </label>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={youtube.base}
            className="flex items-center text-xs text-blue-500 underline outline-none ring-juniper-500 hover:text-blue-700 focus-visible:ring-2"
          >
            {/* YouTube */}
            <RiShareBoxLine />
          </a>
        </div>

        {/* Video-URL Input, Placeholder, Button */}
        <div className="group/url-input relative flex h-9 rounded-sm">
          {/* Video-URL input */}
          <input
            autoFocus
            id={linkInputId}
            form={linkFormId}
            placeholder="&nbsp;"
            {...register("url")}
            className="peer z-10 h-full flex-1 rounded-l-sm border border-stone-300 px-3 text-sm text-stone-800 outline-none transition focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-juniper-400 [&:is(:focus-visible,:hover)]:border-juniper-500"
          />

          {/* Video-URL Placeholder */}
          <p className="pointer-events-none absolute left-3.5 top-1/2 z-20 -translate-y-1/2 text-sm tracking-wider text-stone-400 transition duration-300 peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
            {youtube.placeholder}
          </p>

          {/* Video-URL Button */}
          <button
            form={linkFormId}
            className="group/url-button grid h-full w-12 place-items-center rounded-r-sm border-y border-r border-stone-300 bg-zinc-100 outline-none"
          >
            <SlMagnifierAdd
              size={20}
              className="text-stone-400 transition group-[:is(:hover,:focus-visible)]/url-button:scale-105 group-[:is(:hover,:focus-visible)]/url-button:text-slate-500"
            />
          </button>
        </div>

        {/* TODO:  */}
        {/* Video-URL Error Message */}
        {errors.url && (
          <div className="flex h-[25px] items-center space-x-1.5 px-1 text-red-600">
            <FaExclamationTriangle />
            <p className="break-all text-sm line-clamp-1">
              {errors.url.message}
            </p>
          </div>
        )}
        {/* <div className="h-[25px] px-1 flex items-center space-x-1.5 text-red-600">
          <FaExclamationTriangle />
          <p className="text-sm line-clamp-1 break-all">
            エラーメッセージエラーメッセージエラーメッセージエラーメッセージ
          </p>
        </div> */}
      </form>
    </>
  );
};
