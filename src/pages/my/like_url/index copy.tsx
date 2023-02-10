import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import React, { ReactElement, useEffect, useState } from "react";
import { useGetCategories } from "#/hooks/useGetCategories";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxExclamationTriangle } from "react-icons/rx";
import { CategoryFieldArray } from "#/components/pages/my/like_url/CategoryFieldArray";
import { useGetLinks } from "#/hooks/useGetLinks";
import { useMutateVideo } from "#/hooks/useMutateVideo";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { Button } from "#/components/uiParts/Button";
import Link from "next/link";
import { FaCheck, FaExclamationTriangle, FaSave } from "react-icons/fa";
import Error from "next/error";

const DemoUrls = [
  "https://www.youtube.com/watch?v=Xft8GRzXupY",
  "https://www.youtube.com/watch?v=bsE1VJn1HeU",
  "https://www.youtube.com/watch?v=6ZwnBI4Rb1w",
  "https://www.youtube.com/watch?v=3m1FcGW6V4g",
  "https://www.youtube.com/watch?v=cEksV9VDkUI",
  "https://www.youtube.com/watch?v=NiknNI_0J48",
];

const schema = z.object({
  youtube: z
    .array(
      z.object({
        categoryId: z.string(),
        categoryName: z
          .string()
          .max(20, "20文字以内で入力してください。")
          .superRefine((value, ctx) => {
            if (value !== "" && !value.trim()) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "スペースのみの入力はできません。",
              });
            }
          }),
        video: z
          .array(
            z.object({
              id: z.string(),
              videoId: z.string(),
              title: z.string(),
              thumbnailUrl: z.string(),
              channelId: z.string(),
              channelTitle: z.string(),
              channelThumbnailUrl: z.string(),
            })
          )
          .superRefine((values, ctx) => {
            const videoIdArray = values.map(({ videoId }) => videoId);
            const videoIdSet = new Set(videoIdArray);
            if (videoIdSet.size !== videoIdArray.length) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "コレクション内に同じ動画が重複しています。",
              });
            }
          }),
      })
    )
    .superRefine((values, ctx) => {
      const categoryNameArray = values.map(({ categoryName }) => categoryName);
      const categoryNameSet = new Set(categoryNameArray);
      if (categoryNameSet.size !== categoryNameArray.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "コレクション名が重複しています。",
        });
      }
    }),
});

export type Schema = z.infer<typeof schema>;

const LikeUrl: NextPageWithLayout = () => {
  const { data: session } = useSession();
  // const { data: videos } = useGetLinks(session);
  // const { data: categories } = useGetCategories(session);
  const videosResult = useGetLinks(session);
  const categoriesResult = useGetCategories(session);
  const [values, setValues] = useState<Schema>();
  const { mutateAsync } = useMutateVideo();

  const { data: videos } = videosResult;
  const { data: categories } = categoriesResult;

  useEffect(() => {
    if (!videos || !categories) return;
    // console.log("videos:", videos);
    // 未追加の場合 => []
    // console.log("categories:", categories);
    // 未追加の場合 => []

    /**
     * @returns videosとcategoriesが[]の場合、[]が返る。
     */
    const values = categories.map((category) => {
      const videosOnCategory = videos.filter((video) => {
        return category.id === video.categoryId;
      });
      const videoData = videosOnCategory.map(
        ({
          id,
          videoId,
          title,
          thumbnailUrl,
          channelId,
          channelTitle,
          channelThumbnailUrl,
        }) => ({
          id,
          videoId,
          title,
          thumbnailUrl,
          channelId,
          channelTitle,
          channelThumbnailUrl,
        })
      );

      return {
        categoryId: category.id,
        categoryName: category.name,
        video: videoData,
      };
    });

    // setTimeout(() => {
    //   setValues({ youtube: values });
    // }, 5000);
    setValues({ youtube: values });
  }, [videos, categories]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<Schema>({
    values,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    // console.log("onSubmit data:", data);
    mutateAsync(data, {
      onSuccess: () => toast.success("変更を反映しました。"),
    });
  };

  if (videosResult.isError) {
    return <Error statusCode={404} />;
  } else if (categoriesResult.isError) {
    return <Error statusCode={404} />;
  }

  if (videosResult.isLoading || categoriesResult.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="scroll-target" className="">
        {/* Save Button (sticky) */}
        <div className="sticky z-30 top-0 h-[calc(100vh_-_100px)] pointer-events-none">
          <form id="save-video" onSubmit={handleSubmit(onSubmit)}>
            <button
              disabled={!isDirty || isSubmitting}
              className={clsx(
                "absolute right-0 bottom-0 py-2 w-28 rounded-full bg-accent text-white outline-none ring-2 ring-offset-[3px] ring-secondary shadow-[1px_2px_3px_5px_rgba(0,0,0,0.2)] transition duration-300 pointer-events-auto",
                isDirty
                  ? "[&:is(:hover,:focus-visible)]:ring-accent"
                  : "cursor-not-allowed bg-secondary text-stone-400",
                isSubmitting && "cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <span>...</span>
              ) : isSubmitSuccessful || !isDirty ? (
                <span className="flex items-center justify-center space-x-2">
                  <FaCheck />
                  <span>Saved</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <FaSave />
                  <span>Save</span>
                </span>
              )}
            </button>
          </form>
        </div>

        <div className="-mt-[calc(100vh_-_100px)] pb-1 [&:not(:has(div[id='addCollectionButtonWrapper']))]:pb-[68px]">
          <CategoryFieldArray
            {...{ control, register, setValue, getValues, errors }}
          />
        </div>

        {/* {errors.youtube && errors.youtube.message && (
          <div className="px-1 flex items-center space-x-1.5 text-red-600">
            <FaExclamationTriangle />
            <p className="text-sm line-clamp-1 break-all">
              {errors.youtube.message}
            </p>
          </div>
        )} */}
      </div>
    </>
  );
};

LikeUrl.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LikeUrl;
