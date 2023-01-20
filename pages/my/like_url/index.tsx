import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/Layout";
import React, { ReactElement, useEffect, useState } from "react";
import { useGetCategories } from "#/lib/useGetCategories";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxExclamationTriangle } from "react-icons/rx";
import { CategoryFieldArray } from "#/components/CategoryFieldArray";
import { useGetLinks } from "#/lib/useGetLinks";
import { useMutateVideo } from "#/lib/useMutateVideo";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { Button } from "#/components/Button";
import { demoUrls } from "#/lib/demodata";

const schema = z.object({
  youtube: z
    .array(
      z.object({
        categoryId: z.string(),
        categoryName: z.string(),
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
                message: "Video already exists",
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
          message: "Category already exists",
        });
      }
    }),
});

export type Schema = z.infer<typeof schema>;

const LikeUrl: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data: videos } = useGetLinks(session);
  const { data: categories } = useGetCategories(session);
  const [values, setValues] = useState<Schema>();
  const { mutateAsync } = useMutateVideo();

  useEffect(() => {
    if (!videos || !categories) return;

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

    setValues({ youtube: values });
  }, [videos, categories]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<Schema>({
    values,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    // console.log("onSubmit data:", data);
    const result = await mutateAsync(data);
    if (result.type === "success") {
      toast.success("変更を反映しました。");
    }
  };

  useEffect(() => {
    if (!errors.youtube) return;
    console.log("errors.youtube:\n", errors.youtube);
  }, [errors.youtube]);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CategoryFieldArray
          {...{ control, register, setValue, getValues, errors }}
        />
        {errors.youtube && errors.youtube.message && (
          <div className="text-red-500 flex space-x-1.5">
            <RxExclamationTriangle className="relative top-[5px]" />
            <p>{errors.youtube.message}</p>
          </div>
        )}
        {/* FIXME: useMutateVideoのinvalidateQueriesが不安定 */}
        <Button
          {...{ isValid, isDirty, isSubmitting }}
          submittingText="保存中…"
          submitText="変更を保存"
          SubmittedText="変更が反映されました"
        />
      </form>
      {/* Demo url */}
      <ul>
        {demoUrls.map((url, index) => (
          <li key={index} className="flex w-[400px]">
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                navigator.clipboard.writeText(
                  e.currentTarget.firstElementChild?.innerHTML!
                );
              }}
            >
              <p className="flex-1">{url}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

LikeUrl.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LikeUrl;
