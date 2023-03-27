import { ReactElement, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ACCEPTED_IMAGE_TYPES, ONE_MEGA_BYTE } from "#/const/profile";
import { NextPageWithLayout } from "#/pages/_app";
import {
  Appearance,
  DashboardBackground,
  DashboardForm,
  DashboardHeader,
  DashboardMain,
  Layout,
} from "#/components/shared";
import {
  AvatarInput,
  DescriptionTextarea,
  NameInput,
  ProfileSkeleton,
  PublicUrlInput,
  TogglePublishedSwitch,
} from "#/components/pages/my/profile";
import { DashboardButton, Divider, Spacer } from "#/components/uiParts";
import { useGetProfile, usePatchProfileBaseInfo } from "#/hooks";
import { schema } from "#/schema/profile";
import { uploadAndGetUrl } from "#/utils";
import { pagesInfo } from "#/const";

const profilePage = pagesInfo.my.profile;

export type Schema = z.infer<typeof schema>;

const fileSchema = z.custom<File>().superRefine((file, ctx) => {
  if (file.size > ONE_MEGA_BYTE * 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: "number",
      maximum: ONE_MEGA_BYTE * 2,
      inclusive: true,
      message: "ファイルサイズの上限は 2MB までです。",
    });
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_enum_value,
      options: ACCEPTED_IMAGE_TYPES,
      received: file.type,
      message: "アップロード可能な形式は JPEG と PNG です。",
    });
  }
});

export type FileSchema = z.infer<typeof fileSchema>;

const Profile: NextPageWithLayout = () => {
  const { data: profile, isLoading } = useGetProfile();
  const [previewFile, setPreviewFile] = useState<File>();
  const [defaultFile, setDefaultFile] = useState(previewFile);
  const { mutateAsync } = usePatchProfileBaseInfo();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<Schema>({
    values: profile,
    resolver: zodResolver(schema),
  });

  const isProfileDirty = useMemo(() => {
    return isDirty || defaultFile !== previewFile;
  }, [isDirty, defaultFile, previewFile]);

  const isFileError = useMemo(() => {
    return (
      previewFile &&
      (previewFile.size > ONE_MEGA_BYTE * 2 ||
        !ACCEPTED_IMAGE_TYPES.includes(previewFile.type))
    );
  }, [previewFile]);

  useEffect(() => {
    if (isSubmitSuccessful) setDefaultFile(previewFile);
  }, [isSubmitSuccessful]);

  /**
   * @param {string | null} fData.slug 初期値はschema.prismaのString?によりnull
   */
  const onSubmit: SubmitHandler<Schema> = async (fData) => {
    // await new Promise((r) => setTimeout(r, 3000));
    // return;
    console.log("onSubmit");

    /** slug 重複検証 */
    if (fData.slug && fData.slug !== profile!.slug) {
      try {
        await axios.get(`/api/query/profiles`, {
          params: {
            slug: fData.slug,
          },
        });
      } catch (error) {
        setError("slug", {
          type: "duplicate",
          message: `「${fData.slug}」はすでに使用されています。`,
        });
        return;
      }
    }

    /**
     * Cloud Storage for Firebaseへの画像の保存とdownloadURLの取得
     * => ファイル未選択時: FileList { length: 0 }
     * => 選択時: FileList { 0: File, length: 1 }
     */
    let image: string | undefined;

    if (previewFile) {
      let parsedFile: FileSchema;
      try {
        parsedFile = fileSchema.parse(previewFile);
      } catch (error) {
        return;
      }

      image = await uploadAndGetUrl(parsedFile);
    }

    const { name, slug, description } = fData;
    const data = {
      slug,
      image,
      name,
      description,
    };

    mutateAsync(data, {
      onSuccess: () => toast.success("プロフィールを更新しました"),
      onError(error, variables, context) {
        console.log("profile onSubmit onError:", error);
        if (error.response?.data.code === "P2000") {
          toast.error("ファイル名を短くし、アップロードし直してください。");
        }
      },
    });
  };

  // slug重複確認ボタン
  // const handleValidateButton = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   const slug = getValues("slug");
  //   if (defaultValues?.slug === slug) {
  //     setVerifiedText("現在設定中のURLです");
  //     return;
  //   }
  //   try {
  //     const res = await axios.get(`/api/profile/${slug}`);
  //     res.data
  //       ? setVerifiedText("他の人により使用されています")
  //       : setVerifiedText("使用できます");
  //   } catch (error) {}
  // };

  return isLoading ? (
    <ProfileSkeleton />
  ) : (
    <Appearance>
      <DashboardHeader pageTitle={profilePage.title.ja} />

      <DashboardMain>
        <DashboardBackground bgImage="profile">
          <Spacer size={64} axis="column" />
          <DashboardForm
            formKey={profilePage.key}
            {...{ onSubmit, handleSubmit }}
          >
            <div className="space-y-12">
              <AvatarInput {...{ previewFile, setPreviewFile }} />
              <NameInput {...{ control, register, errors }} />
              <PublicUrlInput {...{ control, register, errors }} />
              <DescriptionTextarea {...{ control, register, errors }} />
            </div>

            <Spacer size={48} axis="column" />
            <div className="flex justify-end">
              <DashboardButton
                formKey={profilePage.key}
                isEnabled={isProfileDirty && !isFileError}
                isSubmitting={isSubmitting}
              />
            </div>
          </DashboardForm>
          <Spacer size={40} axis="column" />
          <Divider bgColor="bg-stone-400" />
          <Spacer size={40} axis="column" />
          <TogglePublishedSwitch />
          <Spacer size={80} axis="column" />
        </DashboardBackground>
      </DashboardMain>
    </Appearance>
  );
};

Profile.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Profile;
