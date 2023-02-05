import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import avatar2 from "#/public/avatar2.png";
import { uploadAndGetUrl } from "#/lib/firebaseStorage";
import { useGetProfile } from "#/lib/useGetProfile";
import { useSession } from "next-auth/react";
import { InputCounter } from "#/components/pages/my/profile/InputCounter";
import clsx from "clsx";
import { usePatchProfile } from "#/lib/usePatchProfile";
import { ResetVerifiedText } from "#/components/pages/my/profile/ResetVerifiedText";
import axios from "axios";
import { ValidateButton } from "#/components/pages/my/profile/ValidateButton";
import { toast } from "react-hot-toast";
import { Profile } from "@prisma/client";
import { z } from "zod";
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
import silhouetteAvatar from "#/public/silhouette-avatar2.png";
import defaultAvatar from "#/public/247324.png";
import { FiUploadCloud } from "react-icons/fi";
import { Divider } from "#/components/uiParts/Divider";

const MAX_FILE_SIZE = 2_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const ONE_MEGA_BYTE = 1_048_576;

const schema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください。")
    .max(20, "20文字以内で入力してください。")
    .refine((value) => !!value.trim(), "空白文字のみの入力はできません。"),
  // fileList: z.instanceof(FileList),
  fileList: z
    .custom<FileList>()
    // .refine((files) => files?.length == 1, "Image is required.")
    // .refine(
    //   (fileList) => fileList?.[0]?.size <= MAX_FILE_SIZE,
    //   "ファイルサイズの上限は2MBです。"
    // )
    // .refine(
    //   (fileList) => ACCEPTED_IMAGE_TYPES.includes(fileList?.[0]?.type),
    //   "アップロード可能な形式は.jpg, .jpeg, .pngです。"
    // )
    .superRefine((fileList, ctx) => {
      // if (Object.hasOwn(fileList, "0") && fileList[0].size > MAX_FILE_SIZE) {
      if (!Object.hasOwn(fileList, "0")) return;
      if (fileList[0].size > MAX_FILE_SIZE) {
        ctx.addIssue({
          // code: z.ZodIssueCode.custom,
          code: z.ZodIssueCode.too_big,
          type: "number",
          maximum: MAX_FILE_SIZE,
          inclusive: true,
          message: "ファイルサイズの上限は 2MB までです。",
        });
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(fileList[0].type)) {
        ctx.addIssue({
          // code: z.ZodIssueCode.custom,
          code: z.ZodIssueCode.invalid_enum_value,
          options: ACCEPTED_IMAGE_TYPES,
          received: fileList[0].type,
          message: "アップロード可能な形式は JPEG と PNG です。",
        });
      }
    }),
  slug: z
    .string()
    .max(20, "4~20文字、英数字(小文字)、間にハイフン(-)のみ使用できます")
    // TODO: 間にハイフンを使用できる正規表現
    .regex(
      /^[a-zA-Z0-9]*$/,
      "4~20文字、英数字(小文字)、間にハイフン(-)のみ使用できます"
    )
    .transform((value, ctx) => {
      if (value.length > 0 && value.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "4~20文字、英数字(小文字)、間にハイフン(-)のみ使用できます",
        });
        return z.NEVER;
      }
      if (value.length === 0) {
        return null;
      }
      return value;
    })
    .nullable(),
  description: z
    .string()
    .max(200, "200文字以内で入力してください。")
    .superRefine((value, ctx) => {
      if (value.length > 0 && !value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "空白文字のみの入力はできません。",
        });
      }
    })
    .nullable(),
});

export type Schema = z.infer<typeof schema>;

// type PreviewData = {
//   name: string;
//   size: number;
//   type: string;
//   url: string;
// };

type PreviewData = {
  fileList: FileList;
  url: string;
};

const Profile: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data: profile, isLoading, isError, error } = useGetProfile(session);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [previewData, setPreviewData] = useState<PreviewData>();
  const [previewData, setPreviewData] = useState<PreviewData>();
  // const [verifiedText, setVerifiedText] = useState("");
  const { mutateAsync } = usePatchProfile();
  const [errorMessage, setErrorMessage] = useState("");
  const [useFormValues, setUseFormValues] = useState<Schema>();

  useEffect(() => {
    if (!profile) return;
    // console.log("profile is fetched");

    setUseFormValues({
      name: profile.name,
      // fileList: {} as FileList,
      // fileList: previewData?.fileList || ({ length: 0 } as FileList),
      fileList: previewData?.fileList || getValues("fileList"),
      slug: profile.slug,
      description: profile.description,
    });
  }, [profile]);

  const {
    register,
    handleSubmit,
    control,
    setError,
    getValues,
    setValue,
    watch,
    formState: {
      errors,
      isDirty,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
    },
  } = useForm<Schema>({
    // valuesオプションでの初期値の設定には型を変更する必要がありそう。
    // values: profile as FormValues,
    values: useFormValues,
    resolver: zodResolver(schema),
  });

  // useEffect(() => {
  //   console.log("isDirty:", isDirty);
  // }, [isDirty]);

  /**
   * @param {string | null} fData.slug 初期値はschema.prismaのString?によりnull
   */
  const onSubmit: SubmitHandler<Schema> = async (fData) => {
    // console.log("profile.slug:", profile!.slug);
    // console.log("typeof fData.slug:", typeof fData.slug);
    console.log("fData.fileList", fData.fileList);
    console.log("onSubmit");
    // return;

    // setErrorMessage("");
    // setVerifiedText("");

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
          // setErrorMessage(
          setError("slug", {
            type: "duplicate",
            message: `「${fData.slug}」はすでに使用されています`,
          });
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }

    /**
     * Cloud Storage for Firebaseへの画像の保存とdownloadURLの取得
     * console.log("fileList:", fileList);
     * => ファイル未選択時: FileList { length: 0 }
     * => 選択時: FileList { 0: File, length: 1}
     */
    let image;
    if (Object.hasOwn(fData.fileList, "0")) {
      image = await uploadAndGetUrl(fData.fileList[0]);
    }
    // if (previewData && previewData.fileList.item(0)) {
    //   image = await uploadAndGetUrl(previewData.fileList[0]);
    // }

    const { name, slug, description } = fData;
    const data = {
      slug,
      image,
      name,
      description,
    };

    // const profileData = await mutateAsync({ id, data });

    // if (Object.hasOwn(profileData, "id")) {
    //   // if ("id" in profileData) {
    //   toast.success("プロフィールを更新しました。");
    // }
    mutateAsync(
      { id, data },
      {
        onSuccess: () => toast.success("プロフィールを更新しました"),
      }
    );
  };

  const watchFileList = watch("fileList");

  useEffect(() => {
    console.log("watchFileList=>", watchFileList);
    if (watchFileList === undefined) return;

    const file = watchFileList.item(0);

    if (file === null) {
      /** マウント時、キャンセル時 */
      if (!previewData) return;
      /** 選択＋キャンセル時 */
      setValue("fileList", previewData.fileList);
      return;
    }

    setPreviewData({
      fileList: watchFileList,
      url: URL.createObjectURL(file),
    });
  }, [watchFileList]);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChangeImage");
    // console.log("getValues('fileList'):", getValues("fileList"));
    // return;

    /** getValues()の使用 */
    const fileList = getValues("fileList");
    const file = fileList.item(0);

    /** キャンセル時 */
    if (file === null) {
      if (!previewData) return;
      /** ファイルを一度選択後、キャンセルすることでonChangeが発火した場合 */
      // FIXME: setValueが効かない。button onClickからだと効く。
      // console.log("getValues('fileList')=>", getValues("fileList"));
      // setValue("fileList", previewData.fileList);
      // console.log("getValues('fileList')=>", getValues("fileList"));

      setPreviewData(undefined);
      return;
    }

    // if (!e.target.files || !e.target.files[0]) return;
    // if (!e.target.files || !e.target.files.length) return;
    // const file = e.target.files[0];

    /** MIME type validation */
    // if (!file.type.startsWith("image")) {
    //   toast.error("画像ファイルを選択してください。");
    //   return;
    // }

    /** URL.createObjectURL */
    // setPreviewUrl(URL.createObjectURL(file));
    setPreviewData({
      fileList,
      // name: file.name,
      // size: file.size,
      // type: file.type,
      url: URL.createObjectURL(file),
    });

    /** FileReader */
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

  // console.log("profile/index.tsx");

  if (isError) return <span>{error.message}</span>;

  const mimeToFileFormat = (type: string) => {
    // switch (type) {
    //   case "image/jpeg":
    //     return "JPEG";
    //   case "image/png":
    //     return "PNG";
    //   default:
    //     const fileFormat = type.split("/")[1].toUpperCase();
    //     return fileFormat;
    // }
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

  return !isLoading ? (
    <div className="flex flex-col space-y-6">
      {/* ページタイトル */}
      <div className="sticky top-0 z-10 bg-white shadow-[0_-32px_0_white] space-y-2">
        <h2 className="text-lg font-bold">プロフィール編集ページ</h2>
        <Divider />
      </div>

      <div>
        <button
          onClick={() => console.log(getValues("fileList"))}
          className="border-2 border-indigo-400"
        >
          getValues("fileList")
        </button>
        <button
          onClick={() => console.log("isDirty:", isDirty)}
          className="border-2 border-indigo-400"
        >
          isDirty
        </button>
        <button
          onClick={() => setValue("fileList", previewData!.fileList)}
          className="border-2 border-indigo-400"
        >
          setValue
        </button>
      </div>

      {/* Profile Forms */}
      <div className="px-2 space-y-8">
        {/* Profile Inputs */}
        <div className="flex flex-col space-y-8">
          {/* Avatar */}
          <div className="space-y-1">
            <h3 className="tracking-wider">アイコン</h3>
            <div className="group/avatar rounded-sm flex space-x-4">
              {/* Avatar > L Inputs */}
              <div className="group/avatar-inputs relative flex items-center shrink-0">
                <Image
                  src={previewData?.url ?? profile.image ?? silhouetteAvatar}
                  alt="avatar-inputs"
                  width={112}
                  height={112}
                  // className="rounded-full ring-1 ring-secondary ring-offset-2 group-[:is(:has(:focus-visible),:has(label:hover))]/avatar-inputs:ring-accent group-[:has(:focus-visible)]/avatar-inputs:ring-2 transition-shadow duration-300 w-28 h-28 object-cover"
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
                  {...register("fileList", {
                    // onChange: handleChangeImage,
                  })}
                />
              </div>

              {/* Avatar > R | Data & Error Message */}
              <div className="grow flex flex-col justify-between">
                {/* File Name */}
                <div className="px-2">
                  <p className="line-clamp-1 break-all h-6">
                    {previewData && previewData.fileList[0].name}
                    {/* eric-muhr-m8AE-nBE-Gg.jpg */}
                  </p>
                </div>

                <Divider />

                {/* Size */}
                <div className="flex space-x-3 px-2">
                  {/* L */}
                  <div className="w-11 shrink-0">
                    <p className="text-xs text-right leading-5 translate-y-[0.7px] text-stone-400">
                      Size:
                    </p>
                  </div>
                  {/* R */}
                  <div className="flex-1">
                    {/* MB, KB */}
                    <p
                      className={clsx(
                        "text-sm h-5",
                        previewData &&
                          previewData.fileList[0].size > ONE_MEGA_BYTE * 2 &&
                          "text-red-600"
                      )}
                    >
                      {previewData &&
                        bytesToKilobytes(previewData.fileList[0].size)}
                      {/* 1.68 MB */}
                    </p>
                    {/* Note */}
                    <p
                      className={clsx(
                        "text-xxs text-stone-400 line-clamp-1 break-all",
                        previewData &&
                          previewData.fileList[0].size > ONE_MEGA_BYTE * 2 &&
                          "text-red-600"
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
                    <p className="text-xs text-right leading-5 translate-y-[0.7px] text-stone-400">
                      Format:
                    </p>
                  </div>
                  {/* R */}
                  <div className="flex-1">
                    {/* JPEG or PNG */}
                    <p
                      className={clsx(
                        "text-sm h-5",
                        previewData &&
                          !ACCEPTED_IMAGE_TYPES.includes(
                            previewData.fileList[0].type
                          ) &&
                          "text-red-600"
                      )}
                    >
                      {previewData &&
                        mimeToFileFormat(previewData.fileList[0].type)}
                      {/* JPEG */}
                    </p>
                    {/* Note */}
                    <p
                      className={clsx(
                        "text-xxs text-stone-400 line-clamp-1 break-all",
                        previewData &&
                          !ACCEPTED_IMAGE_TYPES.includes(
                            previewData.fileList[0].type
                          ) &&
                          "text-red-600"
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
            {/* Name Label */}
            <h3 className="">
              <span>表示名</span>
              <span className="text-red-600">［必須］</span>
            </h3>

            {/* Name Input */}
            <div className="relative h-11 rounded-sm bg-white ring-1 ring-secondary [&:has(:is(:focus-visible,:hover))]:ring-accent [&:has(:focus-visible)]:ring-2 transition group-[:has(.error-message)]:ring-red-600">
              <input
                id="profile-form"
                placeholder="&nbsp;"
                type="text"
                className="peer absolute bottom-0 inset-x-0 h-full pt-5 pb-1.5 px-2 bg-transparent outline-none"
                // {...register("name", { value: profile.name })}
                {...register("name")}
              />

              {/* Label */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 text-stone-400 transition-all duration-300 pointer-events-none peer-[:is(:focus-visible,:not(:placeholder-shown))]:top-0.5 peer-[:is(:focus-visible,:not(:placeholder-shown))]:translate-y-0 peer-[:is(:focus-visible,:not(:placeholder-shown))]:text-xs">
                Name
              </div>

              {/* Name Character Count */}
              <div className="absolute opacity-0 top-0.5 right-2 text-xs text-stone-400 peer-[:is(:focus-visible,:not(:placeholder-shown))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300 pointer-events-none">
                <InputCounter name="name" control={control} maxLength="20" />
              </div>
            </div>

            {/* Name Error Message */}
            {errors.name?.message && (
              <div className="error-message px-1 flex items-center space-x-1.5 text-red-600">
                <FaExclamationTriangle className="w-4 shrink-0" />
                <p className="text-sm line-clamp-1 break-all">
                  {errors.name.message}
                </p>
              </div>
            )}
          </div>

          {/* Public URL */}
          {/* FIXME: 重複確認ボタン */}
          <div className="group space-y-2">
            {/* URL Label */}
            <h3>Public URL</h3>

            {/* URL Inputs */}
            <div className="flex h-11">
              <div className="w-44 bg-[#F5F1EE] text-base-black/70 grid place-items-center ring-1 ring-secondary rounded-l-sm">
                <span className="">https://favolink.com/</span>
              </div>

              <div className="relative flex-1 bg-white ring-1 ring-secondary [&:has(:is(:focus-visible,:hover))]:ring-accent [&:has(:focus-visible)]:ring-2 transition group-[:has(.error-message)]:ring-red-600 rounded-r-sm">
                <input
                  id="profile-form"
                  placeholder="&nbsp;"
                  type="text"
                  className="peer absolute inset-x-0 h-full px-3 bg-transparent outline-none"
                  // {...register("slug", { value: profile.slug })}
                  {...register("slug")}
                />

                {/* URL Placeholder */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 text-stone-400 transition-all duration-300 pointer-events-none peer-[:is(:focus-visible,:not(:placeholder-shown))]:-scale-x-100 peer-[:is(:focus-visible,:not(:placeholder-shown))]:opacity-0">
                  Public URL
                </div>

                {/* URL Character Count */}
                <div className="absolute opacity-0 top-0.5 right-2 text-xs text-stone-400 peer-[:is(:focus-visible,:not(:placeholder-shown))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <InputCounter name="slug" control={control} maxLength="20" />
                </div>
              </div>
            </div>

            {/* URL Error Message */}
            {errors.slug?.message && (
              <div className="error-message px-1 flex items-center space-x-1.5 text-red-600">
                <FaExclamationTriangle className="w-4 shrink-0" />
                <p className="text-sm line-clamp-1 break-all">
                  {errors.slug.message}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="sr-only flex p-2">
            <div className="w-20">Description</div>
            <div>
              <textarea
                id="profile-form"
                className="bg-transparent border border-white rounded-lg"
                // {...register("description", { value: profile.description })}
                {...register("description")}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div>
              <InputCounter
                name={`description`}
                control={control}
                maxLength={`200`}
              />
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
            disabled={
              !isDirty ||
              isSubmitting ||
              (previewData &&
                (previewData.fileList[0].size > ONE_MEGA_BYTE * 2 ||
                  !ACCEPTED_IMAGE_TYPES.includes(previewData.fileList[0].type)))
            }
            className={clsx(
              // "relative py-2 w-28 rounded-sm bg-accent text-white outline-none shadow-md overflow-hidden",
              "relative py-2 w-28 rounded-sm bg-emerald-600 text-white outline-none shadow-md overflow-hidden",
              isDirty
                ? "[&:is(:hover,:focus-visible)]:opacity-80 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                : "cursor-not-allowed [&:is(:hover,:focus-visible)]:brightness-90",
              (isSubmitting ||
                (previewData &&
                  (previewData.fileList[0].size > ONE_MEGA_BYTE * 2 ||
                    !ACCEPTED_IMAGE_TYPES.includes(
                      previewData.fileList[0].type
                    )))) &&
                "cursor-not-allowed"
            )}
          >
            <span className="absolute bottom-0 inset-x-0 h-1/2 bg-black/10"></span>
            <p
              // className="-translate-y-0.5 tracking-wider font-medium drop-shadow-[0_1px_0_rgba(0,0,0,0.75)]"
              className="text-sm -translate-y-0.5 tracking-wider font-medium"
              style={{ textShadow: "0 1px 1px rgba(0, 0, 0, 0.75)" }}
            >
              {isSubmitting ? "..." : "変更を保存"}
            </p>
          </button>
        </form>
      </div>

      <Divider />

      <div className="px-2">
        <PublicOrPrivateSwitch />
      </div>
    </div>
  ) : (
    <span>Loading...</span>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
