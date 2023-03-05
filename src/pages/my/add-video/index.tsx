import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { FaExclamationTriangle } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";

import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared";
import {
  AddVideoSkeleton,
  CategoryListItem,
} from "#/components/pages/my/add-video";
import { Divider, Loader } from "#/components/uiParts";
import { useUpsertUserVideo, useListUserVideo, useFormatData } from "#/hooks";
import { schema } from "#/schema/addVideo";
import { useEffect, useState } from "react";

export type Schema = z.infer<typeof schema>;

const AddVideo: NextPageWithLayout = () => {
  const { data: videos, isLoading } = useListUserVideo();
  const { mutateAsync } = useUpsertUserVideo();
  const values = useFormatData(videos);

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
    name: "videos",
    control,
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    // await new Promise((r) => setTimeout(r, 3000));

    mutateAsync(data, {
      onSuccess: () => toast.success("変更を反映しました。"),
    });
  };

  const appendCategory = () => {
    append({ categoryId: "", categoryName: "", categoryLinks: [] });

    // scrollBottom();
  };

  if (isLoading) {
    // return <Loader className="h-page" />;
    return <AddVideoSkeleton />;
  }

  return (
    <div id="scroll-target" className="flex flex-col animate-appearance">
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 h-16 bg-base-white flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <div className="relative">
            <div className="absolute right-2 bottom-0 flex justify-end space-x-4">
              {/* Add Collection Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={appendCategory}
                  className={clsx(
                    "group/add-collection-button pointer-events-auto flex items-center rounded-sm space-x-1 pl-1 pr-2 bg-white outline-none text-tonys-pink ring-1 ring-tonys-pink transition duration-300 shadow-sm",
                    categoryFields.length < 5
                      ? "[&:is(:hover,:focus-visible)]:bg-tonys-pink [&:is(:hover,:focus-visible)]:text-white"
                      : "ring-gray-300 cursor-not-allowed opacity-60 text-slate-400"
                  )}
                >
                  <span className="relative">
                    <RiAddLine
                      size={24}
                      className={clsx(
                        "absolute",
                        categoryFields.length < 5 &&
                          "group-[:is(:hover,:focus-visible)]/add-collection-button:animate-myPing"
                      )}
                    />
                    <RiAddLine size={24} className="" />
                  </span>
                  <span className="text-sm">Add Collection</span>
                </button>
              </div>

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
                      "relative group h-9 w-28 rounded-md outline-none overflow-hidden transition bg-teal-500 border border-teal-500 flex justify-center items-center",
                      isDirty
                        ? "focus-visible:ring-2 ring-teal-500 ring-offset-1 hover:bg-teal-600"
                        : "cursor-not-allowed opacity-40",
                      isSubmitting && "cursor-progress"
                    )}
                  >
                    <span
                      className={clsx(
                        "absolute bottom-0 left-0 w-full h-1/2 rounded-b-md bg-teal-600 transition",
                        isDirty ? "group-hover:bg-teal-700" : ""
                      )}
                    />
                    {isSubmitting ? (
                      <PuffLoader color="white" size={24} />
                    ) : (
                      <span className="text-sm tracking-wider font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] text-white">
                        変更を保存
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <h2 className="text-lg font-bold w-fit">動画リスト編集</h2>
          </div>
          <div className="shadow-md">
            <Divider />
          </div>
        </div>
      </header>

      {/* メイン */}
      <main>
        <div className="sticky top-16 h-page-main overflow-hidden">
          <div className="bg-img-add-video h-full bg-no-repeat bg-center-90 bg-contain w-3xl py-5 bg-origin-content bg-base-white/50 bg-blend-lighten" />
        </div>

        <div className="-mt-page-main relative z-10 px-6 pt-12 pb-6">
          {/* <ul id="target-ul" className="space-y-8">
          {categoryFields.map((categoryField, categoryIndex) => (
            <li key={categoryField.id}>
              <div id="move button"></div>
              <div>
                <input id="collection-input" />
              </div>
              <ul>
                {linkFields.map((linkField) => (
                  <li key={linkField.id}>
                    {!hasValue ? <div></div> : <div></div>}
                  </li>
                ))}
              </ul>
              <p>{errors.videos[categoryIndex]?.video?.message}</p>
              <button>add video button</button>
            </li>
          ))}
        </ul> */}

          <ul id="target-ul" className="space-y-6">
            {categoryFields.map((categoryField, categoryIndex) => (
              <CategoryListItem
                key={categoryField.id}
                categoryFieldsLength={categoryFields.length}
                {...{
                  categoryField,
                  categoryIndex,
                  control,
                  register,
                  setValue,
                  getValues,
                  errors,
                  move,
                  remove,
                }}
              />
            ))}
          </ul>
        </div>
      </main>

      {/* FIXME: 表示位置 */}
      {/* Error Message（コレクション名の重複など） */}
      {errors.videos && errors.videos.message && (
        <div className="mt-4 px-1 flex items-center space-x-1.5 text-red-600">
          <FaExclamationTriangle />
          <p className="text-sm line-clamp-1 break-all">
            {errors.videos.message}
          </p>
        </div>
      )}
    </div>
  );
};

AddVideo.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddVideo;
