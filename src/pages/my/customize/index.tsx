import { ReactElement, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Mode } from "@prisma/client";
import { z } from "zod";

import { NextPageWithLayout } from "#/pages/_app";
import {
  Appearance,
  DashboardForm,
  DashboardHeader,
  DashboardMain,
  Layout,
} from "#/components/shared";
import {
  BackgroundSelect,
  CustomizeSkeleton,
  ModeSelect,
} from "#/components/pages/my/customize";
import { ACCEPTED_IMAGE_TYPES, ONE_MEGA_BYTE } from "#/const/customize";
import { uploadAndGetUrl } from "#/utils";
import { useGetCustom, usePatchCustom } from "#/hooks";
import { pagesInfo } from "#/const";
import { DashboardButton, Spacer } from "#/components/uiParts";

const customizePage = pagesInfo.my.customize;

const fileSchema = z.custom<File>().superRefine((file, ctx) => {
  if (file.size > ONE_MEGA_BYTE * 4) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: "number",
      maximum: ONE_MEGA_BYTE * 4,
      inclusive: true,
      message: "ファイルサイズの上限は 4MB までです。",
    });
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    // if (!["image/png"].includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_enum_value,
      options: ACCEPTED_IMAGE_TYPES,
      received: file.type,
      message: "対応フォーマットは JPEG / PNG / GIF です。",
    });
  }
});

export type FileSchema = z.infer<typeof fileSchema>;

const Customize: NextPageWithLayout = () => {
  const { data: custom, isLoading } = useGetCustom();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [previewFile, setPreviewFile] = useState<File>();
  const { mutateAsync } = usePatchCustom();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<Mode>();

  const isEnabled = useMemo(() => {
    return !!previewFile || (mode && mode !== custom?.mode);
  }, [previewFile, mode]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setPreviewUrl(undefined);
      setPreviewFile(undefined);
      setMode(undefined);
      setIsSubmitSuccessful(false);
    }
  }, [isSubmitSuccessful]);

  /**
   * @param {string | null} fData.slug 初期値はschema.prismaのString?によりnull
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Loading Test
    // await new Promise((r) => setTimeout(r, 3000));

    /**
     * Cloud Storage for Firebaseへの画像の保存とdownloadURLの取得
     * => ファイル未選択時: FileList { length: 0 }
     * => 選択時: FileList { 0: File, length: 1 }
     */
    let backgroundImage: string | undefined;

    if (previewFile) {
      const parsedFile = fileSchema.safeParse(previewFile);
      if (!parsedFile.success) {
        parsedFile.error.issues.forEach(({ message }) => toast.error(message));
        setIsSubmitting(false);
        return;
      }
      backgroundImage = await uploadAndGetUrl(parsedFile.data);
    }

    const data = {
      backgroundImage,
      mode,
    };

    mutateAsync(data, {
      onSuccess(data, variables, context) {
        setIsSubmitSuccessful(true);
        toast.success("変更を保存しました。");
      },
      onError(error, variables, context) {
        console.log("customize onSubmit onError:", error);
        if (error.response?.data.code === "P2000") {
          // toast.error(error.response.data.message);
          toast.error("ファイル名を短くし、アップロードし直してください。");
        }
      },
      onSettled(data, error, variables, context) {
        setIsSubmitting(false);
      },
    });
  };

  return isLoading ? (
    <CustomizeSkeleton />
  ) : (
    <Appearance>
      <DashboardHeader pageTitle={customizePage.title.ja}>
        <DashboardButton
          formKey={customizePage.key}
          {...{ isEnabled, isSubmitting }}
        />
      </DashboardHeader>

      <DashboardMain>
        <Spacer size={64} axis="column" />
        <DashboardForm formKey={customizePage.key} {...{ onSubmit }}>
          <BackgroundSelect
            {...{
              previewUrl,
              setPreviewUrl,
              previewFile,
              setPreviewFile,
            }}
          />
          <Spacer size={48} axis="column" />
          <ModeSelect {...{ setMode }} />
          <Spacer size={80} axis="column" />
        </DashboardForm>
      </DashboardMain>
    </Appearance>
  );
};

Customize.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Customize;
