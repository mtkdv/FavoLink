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
import { schema } from "#/schema/addVideo";

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
    <div id="scroll-target" className="flex flex-col space-y-6">
      {/* form sr-only */}
      <form
        id="save-video"
        onSubmit={handleSubmit(onSubmit)}
        className="sr-only"
      ></form>

      {/* Save Button (sticky) */}
      {/* <div className="sticky top-0 z-30 h-[calc(100vh_-_100px)] pointer-events-none"> */}
      <div className="sticky top-0 z-30 h-16 bg-white pointer-events-none">
        <button
          disabled={!isDirty || isSubmitting}
          form="save-video"
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
      </div>

      {/* <div className="-mt-[calc(100vh_-_100px)] pb-1 [&:not(:has(div[id='addCollectionButtonWrapper']))]:pb-[68px]"> */}
      <div className="pb-1 [&:not(:has(div[id='addCollectionButtonWrapper']))]:pb-[68px]">
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
  );
};

LikeUrl.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LikeUrl;
