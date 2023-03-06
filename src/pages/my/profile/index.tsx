import Image from "next/image";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PuffLoader } from "react-spinners";
import { TbCameraPlus } from "react-icons/tb";

import {
  ACCEPTED_IMAGE_TYPES,
  ONE_MEGA_BYTE,
  NAME_ERROR_CODE,
  SLUG_ERROR_CODE,
  DESC_ERROR_CODE,
} from "#/const/profile";
import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared";
import {
  InputCounter,
  ProfileSkeleton,
  TogglePublishedSwitch,
} from "#/components/pages/my/profile";
import { Divider } from "#/components/uiParts";
import { useGetProfile, usePatchProfileBaseInfo } from "#/hooks";
import { schema } from "#/schema/profile";
import { bytesToKilobytes, mimeToFileFormat, uploadAndGetUrl } from "#/utils";
import silhouetteAvatar from "/public/silhouette-avatar.png";

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
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [previewFile, setPreviewFile] = useState<File>();
  const [defaultFile, setDefaultFile] = useState(previewFile);
  // const [verifiedText, setVerifiedText] = useState("");
  // const { mutateAsync } = useMutateProfile();
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

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("handleChangeImage");
    // return;

    if (!e.target.files) return;
    const file: File | null = e.target.files.item(0);

    /** キャンセル時 */
    if (file === null) {
      /** 未選択＋キャンセル */
      // if (!previewData) return;

      /**
       * 選択->キャンセル
       * filesはリセットされる。
       */

      // TODO: returnでいいか検討。
      return;
    }

    setPreviewFile(file);

    setPreviewUrl(URL.createObjectURL(file));

    /** FileReaderを利用したpreviewUrlの取得 */
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const res = reader.result;
    //   if (res && typeof res === "string") {
    //     setPreviewUrl(res);
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };

  /** slug重複確認ボタン */
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

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="relative min-h-page flex flex-col animate-appearance">
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 h-16 bg-base-white flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <h2 className="text-lg font-bold w-fit">プロフィール編集</h2>
          <Divider />
        </div>
      </header>

      {/* メイン */}
      <main>
        {/* 背景 */}
        <div className="sticky top-16 h-page-main overflow-hidden">
          <div className="bg-img-profile h-full bg-no-repeat bg-center-90 bg-contain w-3xl py-5 bg-origin-content bg-base-white/90 bg-blend-lighten" />
        </div>

        {/* フォーム */}
        <div className="-mt-page-main relative z-10 mb-6 flex flex-col space-y-6 animate-appearance">
          {/* Profile Forms */}
          <form
            id="profile-form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 px-6 py-4 space-y-12"
          >
            {/* Profile Inputs */}
            <div className="flex flex-col space-y-12">
              {/* Avatar */}
              <div className="space-y-2">
                {/* Avatar Label */}
                <div className="ml-1">
                  <h3 className="text-xs w-fit text-cocoa-800 font-semibold tracking-wide">
                    Profile Icon
                  </h3>
                </div>

                <div className="group/avatar rounded-md bg-white/50 border border-stone-300 px-2 py-3 flex space-x-2 [&:has(.error-message)]:border-red-600 ">
                  {/* Avatar 左: Inputs */}
                  <div className="group/avatar-inputs relative flex items-center shrink-0">
                    <Image
                      src={previewUrl ?? profile?.image ?? silhouetteAvatar}
                      alt="avatar-inputs"
                      width={112}
                      height={112}
                      className="rounded-full w-28 h-28 object-cover shadow-md"
                    />

                    {/* Avatar Label */}
                    <div className="absolute w-full h-full clip-path-circle">
                      <label
                        htmlFor="img-input"
                        className="absolute group bottom-0 w-full h-2/5 bg-black/30 grid place-items-center cursor-pointer hover:bg-black/40 group-[:has(:focus-visible)]/avatar-inputs:bg-black/40 transition"
                      >
                        <TbCameraPlus
                          size={20}
                          className="text-white group-hover:scale-105 group-[:has(:focus-visible)]/avatar-inputs:scale-105 transition"
                        />
                      </label>
                    </div>

                    {/* Avatar Input */}
                    <input
                      form="profile-form"
                      type="file"
                      accept="image/*"
                      id="img-input"
                      className="sr-only"
                      onChange={handleChangeImage}
                    />
                  </div>

                  {/* Avatar 右: 詳細、エラーメッセージ  */}
                  <div className="grow flex flex-col justify-between">
                    {/* File Name */}
                    <div className="px-2">
                      <p className="line-clamp-1 break-all h-5 text-stone-600 text-sm tracking-wide">
                        {previewFile?.name}
                      </p>
                    </div>

                    <Divider />

                    {/* ファイルサイズ */}
                    <div className="flex space-x-3 px-2">
                      {/* 左 */}
                      <div className="w-11 shrink-0">
                        <p className="text-xs tracking-wide text-right leading-5 translate-y-[0.7px] text-stone-500">
                          Size:
                        </p>
                      </div>
                      {/* 右 */}
                      <div className="flex-1">
                        {/* MB, KB */}
                        <p
                          className={clsx(
                            "pl-px text-sm h-5 tracking-wide",
                            previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                              ? "text-red-600"
                              : "text-cocoa-400"
                          )}
                        >
                          {previewFile && bytesToKilobytes(previewFile.size)}
                        </p>
                        {/* Note */}
                        <p
                          className={clsx(
                            "text-xxs line-clamp-1 break-all",
                            previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                              ? "text-red-600 error-message"
                              : "text-stone-500"
                          )}
                        >
                          ファイルサイズの上限は 2MB までです。
                        </p>
                      </div>
                    </div>

                    <Divider />

                    {/* File Format */}
                    <div className="flex space-x-3 px-2">
                      {/* L */}
                      <div className="w-11 shrink-0">
                        <p className="text-xs tracking-wide text-right leading-5 translate-y-[0.7px] text-stone-500">
                          Format:
                        </p>
                      </div>
                      {/* R */}
                      <div className="flex-1">
                        {/* JPEG or PNG */}
                        <p
                          className={clsx(
                            "pl-px text-sm h-5 tracking-wide",
                            previewFile &&
                              !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                              ? "text-red-600"
                              : "text-cocoa-400"
                          )}
                        >
                          {previewFile && mimeToFileFormat(previewFile.type)}
                        </p>
                        {/* Note */}
                        <p
                          className={clsx(
                            "text-xxs line-clamp-1 break-all",
                            previewFile &&
                              !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                              ? "text-red-600 error-message"
                              : "text-stone-500"
                          )}
                        >
                          アップロード可能な形式は JPEG と PNG です。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="group space-y-2">
                {/* Name Label & Count */}
                <div className="ml-1 flex justify-between items-end">
                  {/* Name Label */}
                  <label htmlFor="name-input" className="flex text-cocoa-800">
                    <span className="text-xs font-semibold tracking-wide">
                      Display Name
                    </span>
                    <span className="text-red-400 leading-none">*</span>
                  </label>

                  {/* Name Character Count */}
                  <div className="opacity-0 text-xxs text-cocoa-700 group-[:has(input:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
                    <InputCounter
                      name="name"
                      control={control}
                      maxLength={30}
                    />
                  </div>
                </div>

                {/* Name Input & Placeholder */}
                <div className="relative h-10">
                  {/* Name input */}
                  <input
                    form="profile-form"
                    id="name-input"
                    placeholder="&nbsp;"
                    type="text"
                    className="peer w-full h-full px-3 rounded-md bg-white/50 outline-none text-stone-600 tracking-wider border border-stone-300 [&:is(:hover,:focus-visible)]:border-cocoa-300 focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-cocoa-200 transition group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300"
                    {...register("name")}
                  />

                  {/* Name Placeholder */}
                  <p className="absolute top-1/2 -translate-y-1/2 left-3.5 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
                    Name
                  </p>
                </div>

                {/* Name Note & Error Message */}
                <div className="ml-1 flex space-x-2">
                  <div className="w-7 flex justify-center items-start">
                    <span className="w-full text-center rounded-sm bg-rose-400 text-xxxs text-white shrink-0">
                      必須
                    </span>
                  </div>
                  <div className="text-stone-500 text-xs leading-none flex-1">
                    <p>
                      <span
                        className={clsx(
                          errors.name?.message &&
                            NAME_ERROR_CODE.RANGE === errors.name.message &&
                            "error-message text-red-600"
                        )}
                      >
                        1~30文字以内。
                      </span>
                      <span
                        className={clsx(
                          errors.name?.message &&
                            NAME_ERROR_CODE.WHITESPACE ===
                              errors.name.message &&
                            "error-message text-red-600"
                        )}
                      >
                        空白文字のみは使用できません。
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Public URL */}
              {/* TODO: 重複確認ボタン */}
              <div className="group space-y-2">
                {/* URL label & Count */}
                <div className="ml-1 flex justify-between items-end">
                  {/* URL Label */}
                  <label
                    htmlFor="slug-input"
                    className="text-xs text-cocoa-800 font-semibold tracking-wide"
                  >
                    Public URL
                  </label>

                  {/* URL Character Count */}
                  <div className="opacity-0 text-xxs text-cocoa-700 group-[:has(input:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
                    <InputCounter
                      name="slug"
                      control={control}
                      minLength={4}
                      maxLength={20}
                    />
                  </div>
                </div>

                {/* URL Inputs */}
                <div className="h-10 flex">
                  {/* URL Prefix */}
                  <div className="w-44 bg-stone-100/90 grid place-items-center border border-r-0 border-stone-300 rounded-l-md">
                    <p className="text-stone-800 font-light tracking-wider">
                      https://favolink.com/
                    </p>
                  </div>

                  {/* URL Input & Plaseholder */}
                  <div className="relative flex-1">
                    <input
                      form="profile-form"
                      id="slug-input"
                      placeholder="&nbsp;"
                      type="text"
                      className="peer w-full h-full px-3 rounded-r-md bg-white/50 outline-none text-stone-600 tracking-wider border border-stone-300 [&:is(:hover,:focus-visible)]:border-cocoa-300 focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-cocoa-200 transition group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300"
                      {...register("slug")}
                    />

                    {/* URL Placeholder */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-3.5 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
                      your-content-path
                    </div>
                  </div>
                </div>

                {/* URL Note & Error Message */}
                <div className="ml-1 flex space-x-2">
                  <div className="w-7 flex justify-center items-start">
                    <span className="w-full text-center rounded-sm bg-teal-600 text-xxxs tracking-wide text-white shrink-0">
                      Note
                    </span>
                  </div>
                  <div
                    className={clsx(
                      // "text-xs leading-none flex-1 space-y-1.5 h-12",
                      "relative text-stone-500 text-xs leading-none flex-1 space-y-1.5"
                      // errors.slug?.message &&
                      //   SLUG_ERROR_CODES.includes(errors.slug.message)
                      //   ? "text-red-600"
                      //   : "text-stone-500"
                    )}
                  >
                    <p>
                      <span
                        className={clsx(
                          errors.slug?.message &&
                            SLUG_ERROR_CODE.RANGE === errors.slug.message &&
                            "error-message text-red-600"
                        )}
                      >
                        4~20文字以内。
                      </span>
                      <span
                        className={clsx(
                          errors.slug?.message &&
                            SLUG_ERROR_CODE.REGEX === errors.slug.message &&
                            "error-message text-red-600"
                        )}
                      >
                        英数字(小文字)、ハイフン(-)のみ使用できます。
                      </span>
                    </p>
                    <p
                      className={clsx(
                        errors.slug?.message &&
                          SLUG_ERROR_CODE.REGEX === errors.slug.message &&
                          "error-message text-red-600"
                      )}
                    >
                      ハイフンは連続して使用はできず、また先頭と末尾にも使用できません。
                    </p>
                    {errors.slug?.type && errors.slug.type === "duplicate" && (
                      <p className="error-message absolute text-red-600">
                        {errors.slug.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="group space-y-2">
                {/* Desc Label & Count */}
                <div className="ml-1 flex justify-between items-end">
                  {/* Desc Label */}
                  <label
                    htmlFor="desc-textarea"
                    className="text-xs text-cocoa-800 font-semibold tracking-wide"
                  >
                    Selected Video Description
                  </label>

                  {/* Desc Character Count */}
                  <div className="opacity-0 text-xxs text-cocoa-700 group-[:has(textarea:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
                    <InputCounter
                      name="description"
                      control={control}
                      maxLength={400}
                    />
                  </div>
                </div>

                {/* Desc Textarea & Placeholder */}
                <div className="relative">
                  {/* Desc textarea */}
                  <textarea
                    form="profile-form"
                    id="desc-textarea"
                    placeholder="&nbsp;"
                    rows={6}
                    className="peer w-full h-full px-3 py-2 rounded-md bg-white/50 outline-none text-stone-600 tracking-wider border border-stone-300 [&:is(:hover,:focus-visible)]:border-cocoa-300 focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-cocoa-200 transition group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300"
                    {...register("description")}
                  />

                  {/* Desc Placeholder */}
                  <p className="absolute top-2 left-3.5 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
                    why you selected these videos
                  </p>
                </div>

                {/* Desc Note & Error Message */}
                <div className="ml-1 flex space-x-2">
                  <div className="w-7 flex justify-center items-start">
                    <span className="w-full text-center rounded-sm bg-teal-600 text-xxxs tracking-wide text-white shrink-0">
                      Note
                    </span>
                  </div>
                  <div className="text-stone-500 text-xs leading-none flex-1">
                    <p>
                      <span
                        className={clsx(
                          errors.description?.message &&
                            DESC_ERROR_CODE.TOO_BIG ===
                              errors.description.message &&
                            "error-message text-red-600"
                        )}
                      >
                        400文字以内。
                      </span>
                      <span
                        className={clsx(
                          errors.description?.message &&
                            DESC_ERROR_CODE.WHITESPACE ===
                              errors.description.message &&
                            "error-message text-red-600"
                        )}
                      >
                        空白文字のみは使用できません。
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            {/* <div className="flex justify-end"> */}
            <div className="h-9 w-28 ml-auto rounded-md bg-base-white">
              <button
                form="profile-form"
                disabled={!isProfileDirty || isSubmitting || isFileError}
                className={clsx(
                  "relative group h-9 w-28 rounded-md outline-none overflow-hidden transition bg-cocoa-400 border border-cocoa-400 flex justify-center items-center",
                  isProfileDirty && !isFileError
                    ? "focus-visible:ring-2 ring-cocoa-400 ring-offset-1 hover:bg-cocoa-500"
                    : "cursor-not-allowed opacity-40",
                  isSubmitting && "cursor-progress"
                )}
              >
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 w-full h-1/2 rounded-b-md bg-cocoa-500 transition",
                    isProfileDirty ? "group-hover:bg-cocoa-600" : ""
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
            </div>
          </form>

          <Divider bgColor="bg-stone-400" classWrapper="px-4" />

          <div className="px-6 pb-8">
            <TogglePublishedSwitch />
          </div>
        </div>
      </main>
    </div>
  );
};

Profile.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Profile;
