import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement, useState } from "react";
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
import { FaCloudUploadAlt, FaExclamationTriangle } from "react-icons/fa";
import silhouetteAvatar from "#/public/silhouette-avatar2.png";
import defaultAvatar from "#/public/247324.png";
import { FiUploadCloud } from "react-icons/fi";

const MAX_FILE_SIZE = 2_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

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
          code: z.ZodIssueCode.custom,
          message: "ファイルサイズの上限は 2MB までです。",
        });
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(fileList[0].type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
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

const Profile: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data: profile, isLoading, isError, error } = useGetProfile(session);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [verifiedText, setVerifiedText] = useState("");
  const { mutateAsync } = usePatchProfile();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<Schema>({
    // valuesオプションでの初期値の設定には型を変更する必要がありそう。
    // values: profile as FormValues,
    resolver: zodResolver(schema),
  });

  /**
   * @param {string | null} fData.slug 初期値はschema.prismaのString?によりnull
   */
  const onSubmit: SubmitHandler<Schema> = async (fData) => {
    // console.log("profile.slug:", profile!.slug);
    // console.log("typeof fData.slug:", typeof fData.slug);
    // console.log("fData.fileList[0].type:", fData.fileList[0].type);
    // console.log("onSubmit");
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

    const { name, slug, description } = fData;
    const data = {
      slug,
      image,
      name,
      description,
    };

    const profileData = await mutateAsync({ id, data });

    if (Object.hasOwn(profileData, "id")) {
      // if ("id" in profileData) {
      toast.success("プロフィールを更新しました。");
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!e.target.files || !e.target.files[0]) return;
    if (!e.target.files || !e.target.files.length) return;
    const file = e.target.files[0];

    /** MIME type validation */
    if (!file.type.startsWith("image")) {
      toast.error("画像ファイルを選択してください。");
      return;
    }

    /** URL.createObjectURL */
    setPreviewUrl(URL.createObjectURL(file));

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

  return !isLoading ? (
    <div className="flex flex-col space-y-6">
      {/* Profile Form */}
      <div className="bg-primary ring-1 ring-secondary ring-offset-[3px] p-4 pt-9 hover:ring-accent transition-shadow duration-300">
        {/* Inputs */}
        <div className="flex flex-col space-y-8">
          {/* Avatar */}
          <div className="group/avatar h-20 flex space-x-3">
            {/* Avatar Inputs */}
            <div className="group/avatar-inputs relative w-20 shrink-0">
              <Image
                src={previewUrl ?? profile.image ?? silhouetteAvatar}
                alt="avatar-inputs"
                width={80}
                height={80}
                className="rounded-full ring-1 ring-secondary ring-offset-2 group-[:has(:is(:focus-visible,:hover))]/avatar-inputs:ring-accent group-[:has(:focus-visible)]/avatar-inputs:ring-2 transition-shadow duration-300 w-20 h-20 object-cover group-[:has(.error-message)]/avatar:ring-red-600"
              />

              <div className="absolute top-0 w-full h-full clip-path-circle">
                <label
                  htmlFor="img-input"
                  className="absolute bottom-0 w-full h-2/5 bg-black/30 grid place-items-center cursor-pointer"
                >
                  <TbCameraPlus
                    size={20}
                    className="text-white -translate-y-1"
                  />
                </label>
              </div>

              <input
                form="profile-form"
                type="file"
                accept="image/*"
                id="img-input"
                className="sr-only"
                {...register("fileList", {
                  onChange: handleChangeImage,
                })}
              />
            </div>

            {/* Note & Error Message */}
            <div className="flex flex-col justify-end">
              {/* Avatar Error Message */}
              {errors.fileList?.message && (
                <div className="error-message flex items-center space-x-1.5 text-red-600">
                  <FaExclamationTriangle className="w-4 shrink-0" />
                  <p className="text-sm line-clamp-1 break-all">
                    {errors.fileList.message}
                  </p>
                </div>
              )}
              {/* <div className="error-message self-end flex items-center space-x-1.5 text-red-600">
                <FaExclamationTriangle className="w-4 shrink-0" />
                <p className="text-sm line-clamp-1 break-all">
                  エラーメッセージエラーメッセージエラーメッセージエラーメッセージ
                </p>
              </div> */}

              {/* Note */}
              {/* TODO: ここの文字を赤くするのもいい。 */}
              <div className="text-xs text-stone-400">
                <div>ファイルサイズの上限は 2MB までです。</div>
                <div>アップロード可能な形式は JPEG と PNG です。</div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="group space-y-2">
            {/* Name Input */}
            <div className="relative h-11 rounded-md bg-white ring-1 ring-secondary [&:has(:is(:focus-visible,:hover))]:ring-accent [&:has(:focus-visible)]:ring-2 transition group-[:has(.error-message)]:ring-red-600">
              <input
                id="profile-form"
                placeholder="&nbsp;"
                type="text"
                className="peer absolute bottom-0 inset-x-0 h-full pt-5 pb-1.5 px-2 bg-transparent outline-none"
                {...register("name", { value: profile.name })}
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
            {/* URL Input */}
            <div className="flex h-11">
              <div className="w-44 bg-secondary grid place-items-center ring-1 ring-secondary rounded-l-md">
                <span className="">https://favolink.com/</span>
              </div>

              <div className="relative flex-1 bg-white ring-1 ring-secondary [&:has(:is(:focus-visible,:hover))]:ring-accent [&:has(:focus-visible)]:ring-2 transition group-[:has(.error-message)]:ring-red-600 rounded-r-md">
                <input
                  id="profile-form"
                  placeholder="&nbsp;"
                  type="text"
                  className="peer absolute inset-x-0 h-full px-2 bg-transparent outline-none"
                  {...register("slug", { value: profile.slug })}
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
          <div className="flex p-2">
            <div className="w-20">Description</div>
            <div>
              <textarea
                id="profile-form"
                className="bg-transparent border border-white rounded-lg"
                {...register("description", {
                  value: profile.description,
                })}
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
        <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <Button
            {...{ isValid, isDirty, isSubmitting }}
            submittingText="…"
            submitText="Update"
          />
        </form>
      </div>

      <PublicOrPrivateSwitch />
    </div>
  ) : (
    <span>Loading...</span>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
