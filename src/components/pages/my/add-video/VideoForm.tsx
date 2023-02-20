import { SetStateAction } from "react";
import { z } from "zod";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { SlMagnifierAdd } from "react-icons/sl";
import { RiShareBoxLine } from "react-icons/ri";

import { Schema } from "#/pages/my/add-video";
import {
  getYouTubeVideoIdFromUrl,
  listChannels,
  listVideos,
} from "#/utils/youtube";

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
  nestIndex: number;
  index: number;
  setHasValues: React.Dispatch<SetStateAction<boolean>>;
  removeVideo: (index: number) => void;
};

export const VideoForm: React.FC<Props> = ({
  setValue,
  nestIndex,
  index,
  setHasValues,
  removeVideo,
}) => {
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
    setValue(`youtube.${nestIndex}.video.${index}.videoId`, videoId);
    setValue(`youtube.${nestIndex}.video.${index}.title`, title);
    setValue(`youtube.${nestIndex}.video.${index}.thumbnailUrl`, thumbnailUrl);
    setValue(`youtube.${nestIndex}.video.${index}.channelId`, channelId);
    setValue(`youtube.${nestIndex}.video.${index}.channelTitle`, channelTitle);
    setValue(
      `youtube.${nestIndex}.video.${index}.channelThumbnailUrl`,
      channelThumbnailUrl
    );

    setHasValues(true);
  };

  return (
    <>
      {/* Remove Video-URL Form */}
      <button
        type="button"
        onClick={() => removeVideo(index)}
        className="absolute right-2 top-2 group/remove outline-none"
      >
        <IoMdClose
          size={20}
          className="text-stone-400 group-[:is(:hover,:focus-visible)]/remove:text-[#222222] transition duration-300 opacity-0 group-hover/collection-item:opacity-100"
        />
      </button>

      {/* Video-URL Form */}
      <form
        onSubmit={handleSubmit(onUpdate)}
        className="h-full w-full flex flex-col justify-center space-y-2 px-3"
      >
        {/* Video-URL Label, a */}
        <div className="flex space-x-2 w-fit">
          <label
            htmlFor={`url-input-${nestIndex}-${index}`}
            className="ml-1 w-fit text-xs text-stone-600 font-semibold tracking-wide"
          >
            YouTube Video URL
          </label>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/"
            className="text-blue-500 underline hover:text flex items-center text-xs hover:text-blue-700"
          >
            {/* YouTube */}
            <RiShareBoxLine />
          </a>
        </div>

        {/* Video-URL Input, Placeholder, Button */}
        <div className="relative group/url-input h-9 rounded-sm flex">
          {/* Video-URL input */}
          <input
            autoFocus
            id={`url-input-${nestIndex}-${index}`}
            placeholder="&nbsp;"
            {...register("url")}
            className="peer z-10 flex-1 h-full px-3 outline-none text-stone-800 text-sm border border-stone-300 [&:is(:focus-visible,:hover)]:border-tonys-pink focus-visible:shadow-[0_0_2px_1px] [&:is(:hover,:focus-visible)]:shadow-tonys-pink/60 transition rounded-l-sm"
          />

          {/* Video-URL Placeholder */}
          {/* <p className="absolute z-20 top-1/2 -translate-y-1/2 left-3 text-sm text-stone-400 tracking-wider transition duration-300 pointer-events-none peer-[:is(:focus-visible,:not(:placeholder-shown))]:-scale-x-100 peer-[:is(:focus-visible,:not(:placeholder-shown))]:opacity-0"> */}
          <p className="absolute z-20 top-1/2 -translate-y-1/2 left-3.5 text-sm text-stone-400 tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
            https://www.youtube.com/watch?v=***********
          </p>

          {/* Video-URL Button */}
          <button className="group/url-button w-12 h-full bg-zinc-100 rounded-r-sm border-y border-r border-stone-300 grid place-items-center outline-none">
            <SlMagnifierAdd
              size={20}
              className="text-stone-400 group-[:is(:hover,:focus-visible)]/url-button:text-slate-500 group-[:is(:hover,:focus-visible)]/url-button:scale-105 transition"
            />
          </button>
        </div>

        {/* TODO:  */}
        {/* Video-URL Error Message */}
        {errors.url && (
          <div className="h-[25px] px-1 flex items-center space-x-1.5 text-red-600">
            <FaExclamationTriangle />
            <p className="text-sm line-clamp-1 break-all">
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
