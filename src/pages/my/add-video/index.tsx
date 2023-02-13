import { ReactElement, useEffect, useState } from "react";
import Error from "next/error";
import { useSession } from "next-auth/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";

import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { CategoryList } from "#/components/pages/my/add-video";
import { Divider } from "#/components/uiParts/Divider";
import { useGetCategories } from "#/hooks";
import { useGetLinks } from "#/hooks";
import { useMutateVideo } from "#/hooks";
import { schema } from "#/schema/addVideo";

export type Schema = z.infer<typeof schema>;

const AddVideo: NextPageWithLayout = () => {
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
    formState: { errors, isDirty, isSubmitting },
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
    <div id="scroll-target" className="flex flex-col space-y-6 pb-6">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 h-16 bg-[#faf9f9] flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <div className="relative">
            <div className="absolute right-0 bottom-0 flex justify-end space-x-4 h-8">
              {/* Add Collection Button */}
              {categoryFields.length < 5 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={appendCategory}
                    className="group/add-collection-button pointer-events-auto flex items-center rounded-sm space-x-1 pl-1 pr-2 bg-white outline-none text-tonys-pink ring-1 ring-tonys-pink transition duration-300 [&:is(:hover,:focus-visible)]:bg-tonys-pink [&:is(:hover,:focus-visible)]:text-white shadow-sm"
                  >
                    <span className="relative">
                      <RiAddLine
                        size={24}
                        className="absolute group-[:is(:hover,:focus-visible)]/add-collection-button:animate-myPing"
                      />
                      <RiAddLine size={24} className="" />
                    </span>
                    <span className="text-sm">Add Collection</span>
                  </button>
                </div>
              )}

              {/* Save Button */}
              <div className="">
                <form
                  id="video-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="h-full"
                >
                  <button
                    disabled={!isDirty || isSubmitting}
                    form="video-form"
                    className={clsx(
                      "group h-full w-24 rounded-sm bg-white outline-none overflow-hidden ring-1 transition",
                      isDirty
                        ? "ring-teal-600 [&:is(:hover,:focus-visible)]:bg-teal-600"
                        : "ring-gray-400 cursor-not-allowed opacity-60",
                      isSubmitting && "cursor-not-allowed"
                    )}
                  >
                    <span
                      className={clsx(
                        "text-sm tracking-wider font-medium drop-shadow-[0_1px_0_rgba(0,0,0,0.1)] transition-colors",
                        isDirty
                          ? "text-teal-600 group-[:is(:hover,:focus-visible)]:text-white"
                          : "text-slate-500"
                      )}
                    >
                      {isSubmitting ? "..." : "変更を保存"}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <h2 className="text-lg font-bold">動画リスト編集</h2>
          </div>
          <div className="shadow-md">
            <Divider bgColor="bg-stone-300" />
          </div>
        </div>
      </div>

      {/* <CategoryList>
        <CategoryListItem>
          <VideoList>
            <VideoListItem />
          </VideoList>
        </CategoryListItem>
      </CategoryList> */}

      <div className="px-6 pt-6">
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
      </div>

      {/* FIXME: 表示位置 */}
      {/* Error Message（コレクション名の重複など） */}
      {errors.youtube && errors.youtube.message && (
        <div className="mt-4 px-1 flex items-center space-x-1.5 text-red-600">
          <FaExclamationTriangle />
          <p className="text-sm line-clamp-1 break-all">
            {errors.youtube.message}
          </p>
        </div>
      )}
    </div>
  );
};

AddVideo.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddVideo;
