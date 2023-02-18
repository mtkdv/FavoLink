import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
// import { Layout } from "#/components/shared/LayoutDefault";
import { ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
// import { uploadAndGetUrl } from "#/lib/firebaseStorage";
// import { useGetProfile } from "#/lib/useGetProfile";
import { useSession } from "next-auth/react";
import { InputCounter } from "#/components/pages/my/profile/InputCounter";
import clsx from "clsx";
// import { usePatchProfile } from "#/lib/usePatchProfile";
import { ResetVerifiedText } from "#/components/pages/my/profile/ResetVerifiedText";
import axios from "axios";
import { ValidateButton } from "#/components/pages/my/profile/ValidateButton";
import { toast } from "react-hot-toast";
import { Profile } from "@prisma/client";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbCameraPlus } from "react-icons/tb";
import { Button } from "#/components/uiParts/Button";
import { PublicOrPrivateSwitch } from "#/components/pages/my/profile/PublicOrPrivateSwitch";
import {
  FaCheck,
  FaCloudUploadAlt,
  FaExclamationTriangle,
  FaSave,
} from "react-icons/fa";
import silhouetteAvatar from "/public/silhouette-avatar.png";
import defaultAvatar from "#/public/247324.png";
import { FiUploadCloud } from "react-icons/fi";
import { Divider } from "#/components/uiParts/Divider";
import Error from "next/error";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  ONE_MEGA_BYTE,
  NAME_ERROR_CODE,
  SLUG_ERROR_CODE,
  DESC_ERROR_CODE,
} from "#/const/profile";
import { schema } from "#/schema/profile";
import { useGetProfile } from "#/hooks/useGetProfile";
import { usePatchProfile } from "#/hooks/usePatchProfile";
import { uploadAndGetUrl } from "#/utils/firebaseStorage";
import { PuffLoader } from "react-spinners";

export type Schema = z.infer<typeof schema>;

const fileSchema = z.custom<File>().superRefine((file, ctx) => {
  if (file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: "number",
      maximum: MAX_FILE_SIZE,
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
  const { data: session } = useSession();
  const { data: profile, isLoading, isError, error } = useGetProfile(session);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [previewFile, setPreviewFile] = useState<File>();
  const [defaultFile, setDefaultFile] = useState(previewFile);
  // const [verifiedText, setVerifiedText] = useState("");
  const { mutateAsync } = usePatchProfile();

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
    // console.log("profile.slug:", profile!.slug);
    // console.log("typeof fData.slug:", typeof fData.slug);
    // console.log("fData.fileList", fData.fileList);
    console.log("onSubmit");

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // return;

    if (session === null || session.user === undefined) return;
    const { id } = session.user;

    /** slug 重複検証 */
    if (typeof fData.slug === "string" && fData.slug !== profile!.slug) {
      try {
        const { data: profiles } = await axios.get<Profile[]>(
          `/api/query/profiles`,
          {
            params: {
              slug: fData.slug,
            },
          }
        );
        if (profiles.length > 0) {
          setError("slug", {
            type: "duplicate",
            message: `「${fData.slug}」はすでに使用されています。`,
          });
          return;
        }
      } catch (error) {
        console.error(error);
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

    mutateAsync(
      { id, data },
      {
        onSuccess: () => toast.success("プロフィールを更新しました"),
      }
    );
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
  //     const res = await axios.get(`/api/profiles/${slug}`);
  //     res.data
  //       ? setVerifiedText("他の人により使用されています")
  //       : setVerifiedText("使用できます");
  //   } catch (error) {}
  // };

  const mimeToFileFormat = (type: string) => {
    const fileFormat = type.split("/")[1].toUpperCase();
    return fileFormat;
  };

  const bytesToKilobytes = (bytes: number): string => {
    const kiloByte = 1024;
    const megaByte = kiloByte * 1024;

    if (bytes >= megaByte) {
      return `${(bytes / megaByte).toFixed(2)} MB`;
    } else if (bytes >= kiloByte) {
      return `${(bytes / kiloByte).toFixed(2)} KB`;
    }
    return `${bytes} B`;
  };

  /**
   * zodで定義したエラーが発生しているかどうか。
   * @param {string} message RHFのerrors.field.messageを渡す。zod schemaのmessageに記述したエラーコードを参照する。
   */
  const isErrorCodeExist = <T extends Record<string, string>>(
    errorCodes: T,
    message: string
  ) => {
    type ErrorCode = T[keyof T];

    const values = Object.values(errorCodes) as ErrorCode[];

    return values.includes(message as ErrorCode);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <Error statusCode={404} title={error.message} />;
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* ページタイトル */}
      {/* <div className="sticky top-0 z-10 bg-white shadow-[0_-32px_0_white] space-y-2"> */}
      <div className="sticky top-0 z-10 h-16 bg-white flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <h2 className="text-lg font-bold text-stone-600">プロフィール編集</h2>
          <Divider />
        </div>
      </div>

      {/* <div>
        <button
          onClick={() => console.log("isDirty:", isDirty)}
          className="border-2 border-indigo-400"
        >
          isDirty
        </button>
        <button
          onClick={() => console.log("defaultFile:", defaultFile)}
          className="border-2 border-indigo-400"
        >
          defaultFile
        </button>
        <button
          onClick={() => console.log("previewFile:", previewFile)}
          className="border-2 border-indigo-400"
        >
          previewFile
        </button>
      </div> */}

      {/* Profile Forms */}
      <div className="px-6 py-4 space-y-12">
        {/* Profile Inputs */}
        <div className="flex flex-col space-y-12">
          {/* Avatar */}
          <div className="space-y-2">
            {/* Avatar Label */}
            <div className="ml-1">
              <h3 className="text-xs text-stone-600 font-semibold tracking-wide">
                Profile Icon
              </h3>
            </div>

            <div className="group/avatar rounded-md ring-1 ring-stone-200 px-2 py-3 flex space-x-2">
              {/* Avatar > L Inputs */}
              <div className="group/avatar-inputs relative flex items-center shrink-0">
                <Image
                  src={previewUrl ?? profile.image ?? silhouetteAvatar}
                  alt="avatar-inputs"
                  width={112}
                  height={112}
                  className="rounded-full w-28 h-28 object-cover shadow-md"
                />

                {/* Label */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-full clip-path-circle">
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

                {/* Input type="file" sr-only */}
                <input
                  form="profile-form"
                  type="file"
                  accept="image/*"
                  id="img-input"
                  className="sr-only"
                  onChange={handleChangeImage}
                />
              </div>

              {/* Avatar > R | Data & Error Message */}
              <div className="grow flex flex-col justify-between">
                {/* File Name */}
                <div className="px-2">
                  <p className="line-clamp-1 break-all h-5 text-stone-800 text-sm tracking-wide">
                    {previewFile?.name}
                  </p>
                </div>

                <Divider bgColor="bg-stone-200" />

                {/* Size */}
                <div className="flex space-x-3 px-2">
                  {/* L */}
                  <div className="w-11 shrink-0">
                    <p className="text-xs tracking-wide text-right leading-5 translate-y-[0.7px] text-stone-500">
                      Size:
                    </p>
                  </div>
                  {/* R */}
                  <div className="flex-1">
                    {/* MB, KB */}
                    <p
                      className={clsx(
                        "text-sm h-5 tracking-wide",
                        previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                          ? "text-red-600"
                          : "text-stone-800"
                      )}
                    >
                      {previewFile && bytesToKilobytes(previewFile.size)}
                    </p>
                    {/* Note */}
                    <p
                      className={clsx(
                        "text-xxs line-clamp-1 break-all",
                        previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                          ? "text-red-600"
                          : "text-stone-500"
                      )}
                    >
                      ファイルサイズの上限は 2MB までです。
                    </p>
                  </div>
                </div>

                <Divider bgColor="bg-stone-200" />

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
                        "text-sm h-5 tracking-wide",
                        previewFile &&
                          !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                          ? "text-red-600"
                          : "text-stone-800"
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
                          ? "text-red-600"
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
              <label htmlFor="name-input" className="flex">
                <span className="text-xs text-stone-600 font-semibold tracking-wide">
                  Display Name
                </span>
                <span className="text-stone-600 group-[:has(.error-message)]:text-red-600 leading-none">
                  *
                </span>
              </label>

              {/* Name Character Count */}
              <div className="opacity-0 text-xxs text-stone-500 group-[:has(input:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
                <InputCounter name="name" control={control} maxLength={30} />
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
                className="peer w-full h-full px-3 bg-transparent outline-none text-stone-600 tracking-wider ring-1 ring-stone-200 [&:is(:focus-visible,:hover)]:ring-accent focus-visible:shadow-[0_0_3px_2px_rgba(230,189,173,0.4)] transition group-[:has(.error-message)]:ring-red-600 group-[:has(.error-message)]:shadow-red-200 rounded-md"
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
                        NAME_ERROR_CODE.WHITESPACE === errors.name.message &&
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
                className="text-xs text-stone-600 font-semibold tracking-wide"
              >
                Public URL
              </label>

              {/* URL Character Count */}
              <div className="opacity-0 text-xxs text-stone-500 group-[:has(input:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
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
              <div className="w-44 bg-primary grid place-items-center ring-1 ring-stone-200 rounded-l-md">
                <p className="text-stone-800 font-light tracking-wider">
                  https://favolink.com/
                </p>
              </div>

              {/* URL Input & Plaseholder */}
              <div className="relative flex-1 bg-white">
                <input
                  form="profile-form"
                  id="slug-input"
                  placeholder="&nbsp;"
                  type="text"
                  className="peer w-full h-full px-3 bg-transparent outline-none text-stone-600 tracking-wider ring-1 ring-stone-200 [&:is(:focus-visible,:hover)]:ring-tonys-pink focus-visible:shadow-[0_0_3px_2px_rgba(230,189,173,0.4)] transition group-[:has(.error-message)]:ring-red-600 group-[:has(.error-message)]:shadow-red-200 rounded-r-md"
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
                className="text-xs text-stone-600 font-semibold tracking-wide"
              >
                Selected Video Description
              </label>

              {/* Desc Character Count */}
              <div className="opacity-0 text-xxs text-stone-500 group-[:has(textarea:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
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
                className="peer w-full h-full px-3 py-2 bg-transparent outline-none text-stone-600 tracking-wider ring-1 ring-stone-200 [&:is(:focus-visible,:hover)]:ring-accent focus-visible:shadow-[0_0_3px_2px_rgba(230,189,173,0.4)] transition group-[:has(.error-message)]:ring-red-600 group-[:has(.error-message)]:shadow-red-200 rounded-md"
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

        {/* Form > Button */}
        <form
          id="profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-end"
        >
          <button
            disabled={!isProfileDirty || isSubmitting || isFileError}
            className={clsx(
              "relative h-9 w-28 rounded-md outline-none shadow-md overflow-hidden transition bg-teal-600 flex justify-center items-center",
              !isProfileDirty || isFileError
                ? "cursor-not-allowed opacity-40"
                : "hover:bg-teal-700 focus-visible:ring-2",
              isSubmitting && "cursor-progress"
            )}
          >
            <span className="absolute bottom-0 inset-x-0 h-1/2 bg-black/10"></span>
            {isSubmitting ? (
              <PuffLoader color="white" size={24} />
            ) : (
              <span className="text-sm tracking-wider font-medium drop-shadow-[0_1px_0_rgba(0,0,0,0.1)] text-white">
                変更を保存
              </span>
            )}
          </button>
        </form>
      </div>

      <div className="px-4">
        <Divider />
      </div>

      <div className="px-6 pb-8">
        <PublicOrPrivateSwitch />
      </div>
    </div>
  );
};

Profile.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Profile;
