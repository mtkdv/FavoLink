import { ReactElement, useEffect, useState } from "react";
import Error from "next/error";
import { useSession } from "next-auth/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { FaCheck, FaExclamationTriangle, FaSave } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";

import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { CategoryList } from "#/components/pages/my/add-video";
import { useGetCategories } from "#/hooks";
import { useGetLinks } from "#/hooks";
import { useMutateVideo } from "#/hooks";
import { schema } from "#/schema/addVideo";
import { Divider } from "#/components/uiParts/Divider";

export type Schema = z.infer<typeof schema>;

const LikeUrl: NextPageWithLayout = () => {
  const { data: session } = useSession();
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

  const {
    fields: categoryFields,
    append,
    move,
    remove,
  } = useFieldArray({
    name: "youtube",
    control,
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

  const appendCategory = () => {
    append({ categoryId: "", categoryName: "", video: [] });

    // scrollBottom();
  };

  return (
    <div id="scroll-target" className="flex flex-col space-y-6">
      {/* <div className="pb-1 [&:not(:has(div[id='addCollectionButtonWrapper']))]:pb-[68px]">
        <CategoryFieldArray
          {...{ control, register, setValue, getValues, errors }}
        />
      </div> */}

      {/* <StickyHeader> */}
      <div className="sticky top-0 z-30 h-16 bg-white flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <div className="relative">
            <div className="absolute right-0 flex justify-end space-x-4">
              {/* Add Collection Button */}
              {categoryFields.length < 5 && (
                <div
                  id="addCollectionButtonWrapper"
                  className="flex justify-center"
                >
                  <button
                    type="button"
                    onClick={appendCategory}
                    className="group/addCollectionButton pointer-events-auto flex items-center space-x-1 py-1 pl-1 pr-2 bg-accent text-white outline-none ring-2 ring-offset-[3px] ring-secondary transition-shadow duration-300 [&:is(:hover,:focus-visible)]:ring-accent"
                  >
                    <span className="relative">
                      <RiAddLine
                        size={24}
                        className="absolute group-[:is(:hover,:focus-visible)]/addCollectionButton:animate-myPing"
                      />
                      <RiAddLine size={24} className="" />
                    </span>
                    <span className="text-sm">Add Collection</span>
                  </button>
                </div>
              )}

              {/* Save Button */}
              <div className="">
                <form id="video-form" onSubmit={handleSubmit(onSubmit)}>
                  <button
                    disabled={!isDirty || isSubmitting}
                    form="video-form"
                    className={clsx(
                      // "py-2 w-28 rounded-md bg-teal-600 text-white outline-none ring-2 ring-offset-[3px] ring-secondary shadow-[1px_2px_3px_5px_rgba(0,0,0,0.2)] transition duration-300 pointer-events-auto",
                      "relative py-2 w-28 rounded-md bg-teal-600 text-white outline-none shadow-md overflow-hidden",
                      isDirty
                        ? "[&:is(:hover,:focus-visible)]:opacity-80"
                        : "cursor-not-allowed [&:is(:hover,:focus-visible)]:brightness-90",
                      isSubmitting && "cursor-not-allowed"
                    )}
                  >
                    {/* <>
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
                </> */}
                    <span className="absolute bottom-0 inset-x-0 h-1/2 bg-black/10"></span>
                    <p className="text-sm tracking-wider font-medium drop-shadow-[0_1px_0_rgba(0,0,0,0.75)]">
                      {isSubmitting ? "..." : "変更を保存"}
                    </p>
                  </button>
                </form>
              </div>
            </div>

            <h2 className="text-lg font-bold">動画リスト編集</h2>
          </div>
          <Divider />
        </div>
      </div>
      {/* </StickyHeader> */}

      <CategoryList
        {...{
          control,
          register,
          setValue,
          getValues,
          errors,
          categoryFields,
          move,
          remove,
        }}
      >
        {/* <ul id="target-ul" className="space-y-8">
          {categoryFields.map((categoryField, index) => (
            <CategoryListItem key={categoryField.id}>
              <li>
                <div id="move button"></div>
                <div>
                  <input id="collection-input" />
                </div>
                <VideoList>
                  <ul>
                    {videoFields.map((videoField) => (
                      <VideoListItem key={videoField.id}>
                        <li>{!hasValue ? <div></div> : <div></div>}</li>
                      </VideoListItem>
                    ))}
                  </ul>
                </VideoList>
                <p>{errors.youtube[nestIndex]?.video?.message}</p>
                <button>add video button</button>
              </li>
            </CategoryListItem>
          ))}
        </ul> */}
      </CategoryList>
      {/* Error Message（コレクション名の重複など） */}
      {errors.youtube && errors.youtube.message && (
        <div className="mt-4 px-1 flex items-center space-x-1.5 text-red-600">
          <FaExclamationTriangle />
          <p className="text-sm line-clamp-1 break-all">
            {errors.youtube.message}
          </p>
        </div>
      )}

      {/* Add Collection Button */}
      {categoryFields.length < 5 && (
        <div
          id="addCollectionButtonWrapper"
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={appendCategory}
            className="group/addCollectionButton flex items-center space-x-1 py-1 pl-1 pr-2 bg-accent text-white outline-none ring-2 ring-offset-[3px] ring-secondary transition-shadow duration-300 [&:is(:hover,:focus-visible)]:ring-accent"
          >
            <span className="relative">
              <RiAddLine
                size={24}
                className="absolute group-[:is(:hover,:focus-visible)]/addCollectionButton:animate-myPing"
              />
              <RiAddLine size={24} className="" />
            </span>
            <span className="text-sm">Add Collection</span>
          </button>
        </div>
      )}
    </div>
  );
};

LikeUrl.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LikeUrl;
