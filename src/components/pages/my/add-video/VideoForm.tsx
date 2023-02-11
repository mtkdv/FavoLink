import { SetStateAction } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";
import { SlMagnifierAdd } from "react-icons/sl";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { z } from "zod";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import { toast } from "react-hot-toast";

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
          message: "スペースのみの入力はできません。",
        });
      }
    })
    .transform((url, ctx) => {
      const videoId = getYouTubeVideoIdFromUrl(url);
      if (videoId === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "YouTube動画のURLを貼ってください",
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
  moveAbove: (fromIndex: number) => void;
  moveBelow: (fromIndex: number) => void;
  removeVideo: (index: number) => void;
  isMoveUpEnabled: boolean;
  isMoveDownEnabled: boolean;
};

export const VideoForm: React.FC<Props> = ({
  setValue,
  nestIndex,
  index,
  setHasValues,
  moveAbove,
  moveBelow,
  removeVideo,
  isMoveUpEnabled,
  isMoveDownEnabled,
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
    <div className="flex space-x-[3px]">
      {/* Left */}
      <div className="flex flex-col flex-1">
        {/* LT Label */}
        <div className="flex items-center space-x-1.5 h-[25px] text-sm translate-x-[3px]">
          <IoLogoYoutube className="translate-y-px" />
          <span className="">YouTube Video URL</span>
        </div>

        {/* LM URL Update Form */}
        <form
          onSubmit={handleSubmit(onUpdate)}
          className="relative h-10 p-0.5 [&:has(:is(:focus-visible,:hover))_input]:ring-accent"
        >
          {/* URL Update Input */}
          <input
            autoFocus
            id="urlInput"
            placeholder="https://www.youtube.com/watch?v=***********"
            {...register("url")}
            className="peer w-full h-full bg-transparent pl-2 pr-10 outline-none placeholder:text-stone-400 transition-shadow duration-300 ring-2 ring-secondary"
          />

          {/* Url Update Button */}
          <div className="absolute right-0 h-full w-10 top-1/2 -translate-y-1/2">
            <button
              // onClick={handleSubmit(onUpdate)}
              className="w-full h-full grid place-items-center outline-none group/urlUpdateButton"
            >
              <SlMagnifierAdd className="text-stone-400 group-[:is(:hover,:focus-visible)]/urlUpdateButton:text-base-black transition-colors" />
            </button>
          </div>
        </form>

        {/* LB Error Message */}
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
      </div>

      {/* Right */}
      <div className="flex flex-col space-y-[3px]">
        {/* Remove Video */}
        <button
          type="button"
          onClick={() => removeVideo(index)}
          className="grid place-items-center bg-accent outline-none [&:is(:hover,:focus-visible)]:bg-red-600 transition-colors duration-300"
        >
          <IoMdClose size={24} className="text-white" />
        </button>

        {/* Move Video */}
        <div className="flex flex-col space-y-[3px]">
          <button
            type="button"
            onClick={() => moveAbove(index)}
            disabled={!isMoveUpEnabled}
            className="group/up grid place-items-center outline-none bg-accent disabled:cursor-not-allowed disabled:bg-secondary"
          >
            <VscTriangleUp
              size={24}
              className="text-white transition-transform h-[30px] pointer-events-none translate-y-px group-[:enabled:is(:hover,:focus-visible)]/up:animate-moveUpArrow"
            />
          </button>
          <button
            type="button"
            onClick={() => moveBelow(index)}
            disabled={!isMoveDownEnabled}
            className="group/down grid place-items-center outline-none bg-accent disabled:cursor-not-allowed disabled:bg-secondary"
          >
            <VscTriangleDown
              size={24}
              className="text-white transition-transform h-[30px] pointer-events-none -translate-y-px group-[:enabled:is(:hover,:focus-visible)]/down:animate-moveDownArrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
