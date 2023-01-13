import { getYouTubeVideoIdFromUrl, listVideos } from "#/lib/youtube";
import { Schema } from "#/pages/my/like_url";
import Image from "next/image";
import { FC, useState } from "react";
import {
  SubmitHandler,
  UseFieldArrayUpdate,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxExclamationTriangle } from "react-icons/rx";
import { z } from "zod";

type Props = {
  update: UseFieldArrayUpdate<Schema, `youtube.${number}.video`>;
  nestIndex: number;
  index: number;
  setValue: UseFormSetValue<Schema>;
  getValues: UseFormGetValues<Schema>;
};

const schemaVF = z.object({
  url: z
    .string()
    .min(1, "YouTube動画のURLを貼ってください")
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

export const VideoField: FC<Props> = ({
  update,
  nestIndex,
  index,
  setValue,
  getValues,
}) => {
  const [hasValues, setHasValues] = useState(() => {
    return !!getValues(`youtube.${nestIndex}.video.${index}.videoId`);
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SchemaVF>();

  const onUpdate: SubmitHandler<SchemaVF> = async (data) => {
    // console.log("update data:", data);
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
    const videoData = await listVideos(videoId);
    if (videoData.type === "error") {
      toast.error(videoData.message);
      return;
    }
    const { title, thumbnailUrl } = videoData;

    // const updateData = {
    //   videoId,
    //   title,
    //   thumbnailUrl,
    // };
    // update(index, updateData);
    setValue(`youtube.${nestIndex}.video.${index}.videoId`, videoId);
    setValue(`youtube.${nestIndex}.video.${index}.title`, title);
    setValue(`youtube.${nestIndex}.video.${index}.thumbnailUrl`, thumbnailUrl);

    setHasValues(true);
  };

  return (
    <>
      {!hasValues ? (
        <div>
          <input
            placeholder="URL"
            {...register("url")}
            className="py-1 px-2 w-96 border border-pink-500 outline-none bg-transparent"
          />
          {errors.url && (
            <div className="text-red-500 flex space-x-1.5">
              <RxExclamationTriangle className="relative top-[5px]" />
              <p>{errors.url.message}</p>
            </div>
          )}
          <button onClick={handleSubmit(onUpdate)}>update</button>
        </div>
      ) : (
        <div>
          {/* <button onClick={() => setHasValues(false)}>update取り消し</button> */}
          <Image
            src={getValues(`youtube.${nestIndex}.video.${index}.thumbnailUrl`)}
            alt="thumbnail"
            width={320}
            height={180}
            className="rounded-md hover:scale-105 transition-transform"
          />
          <p className="line-clamp-2">
            {getValues(`youtube.${nestIndex}.video.${index}.title`)}
          </p>
        </div>
      )}
    </>
  );
};
