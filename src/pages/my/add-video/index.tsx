import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { z } from "zod";

import {
  AddCategoryButton,
  AddVideoSkeleton,
  CategoryListItem,
} from "#/components/pages/my/add-video";
import {
  Appearance,
  DashboardBackground,
  DashboardForm,
  DashboardHeader,
  DashboardMain,
  Layout,
} from "#/components/shared";
import { DashboardButton, Flex, Spacer } from "#/components/uiParts";
import { pagesInfo } from "#/const";
import { useUpsertUserVideo, useListUserVideo, useFormatData } from "#/hooks";
import { NextPageWithLayout } from "#/pages/_app";
import { schema } from "#/schema/addVideo";

const addVideoInfo = pagesInfo.my.addVideo;

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

  const isEnabled = useMemo(() => {
    return categoryFields.length < 5;
  }, [categoryFields.length]);

  return isLoading ? (
    <AddVideoSkeleton />
  ) : (
    <Appearance>
      <DashboardHeader pageTitle={addVideoInfo.title.ja}>
        <Flex>
          <AddCategoryButton {...{ isEnabled, appendCategory }} />
          <Spacer size={16} axis="row" />
          <DashboardButton
            formKey={addVideoInfo.key}
            isEnabled={isDirty}
            isSubmitting={isSubmitting}
          />
        </Flex>
      </DashboardHeader>

      <DashboardMain>
        <DashboardBackground bgImage="addVideo">
          <Spacer size={64} axis="column" />
          <DashboardForm
            formKey={addVideoInfo.key}
            {...{ onSubmit, handleSubmit }}
          >
            {/* TODO:  */}
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
          </DashboardForm>
          <Spacer size={80} axis="column" />
        </DashboardBackground>
      </DashboardMain>

      {/* FIXME: 表示位置 */}
      {/* Error Message（コレクション名の重複など） */}
      {errors.videos && errors.videos.message && (
        <div className="mt-4 flex items-center space-x-1.5 px-1 text-red-600">
          <FaExclamationTriangle />
          <p className="line-clamp-1 break-all text-sm">
            {errors.videos.message}
          </p>
        </div>
      )}
    </Appearance>
  );
};

AddVideo.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AddVideo;
