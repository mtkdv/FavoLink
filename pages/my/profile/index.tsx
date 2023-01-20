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
import { RxExclamationTriangle } from "react-icons/rx";
import { Button } from "#/components/uiParts/Button";

const schema = z.object({
  name: z
    .string()
    .min(1, "表示名を入力してください。")
    .max(20, "20文字以内で入力してください。")
    .refine((value) => !!value.trim(), "空白文字のみの入力はできません。"),
  // fileList: z.instanceof(FileList),
  fileList: z.custom<FileList>(),
  // .refine((files) => files?.length == 1, "Image is required.")
  // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
  slug: z
    .string()
    .max(20, "20文字以内で入力してください。")
    .regex(/^[a-zA-Z0-9]*$/, "英数字のみで入力してください。")
    .transform((value, ctx) => {
      if (value.length > 0 && value.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "3文字以上入力してください。",
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
  const { data: profile } = useGetProfile(session);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [verifiedText, setVerifiedText] = useState("");
  const { mutateAsync } = usePatchProfile();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
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
    // console.log("fData.slug:", fData.slug);
    // console.log("typeof fData.slug:", typeof fData.slug);
    // return;

    setErrorMessage("");
    // setVerifiedText("");

    if (session === null || session.user === undefined) return;
    const { id } = session.user;

    /** 重複検証 */
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
          setErrorMessage(
            `入力した『${fData.slug}』はすでに他の人により使用されています。\n別の値を設定し直してください。`
          );
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

  return (
    <div className="py-12 px-6">
      <h2>プロフィール編集</h2>
      {session && profile ? (
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <table className="border border-gray-400 rounded-lg w-full">
            <tbody>
              <tr className="flex p-2">
                <th className="w-20 grid place-items-center">公開URL</th>
                <td className="flex-1">
                  <div className="flex">
                    <div className="bg-slate-600 grid place-items-center px-2 py-1 rounded-l-md">
                      https://favolink.com/
                    </div>
                    <input
                      className="bg-transparent border border-slate-500 px-3 rounded-r-md flex-1 outline-none hover:border-slate-400 transition-all"
                      type="text"
                      {...register("slug", {
                        value: profile.slug,
                      })}
                    />
                    {errors.slug && (
                      <div className="text-red-500 flex space-x-1.5">
                        <RxExclamationTriangle className="relative top-[5px]" />
                        <p>{errors.slug.message}</p>
                      </div>
                    )}
                    {errorMessage.length > 0 && (
                      <div className="text-red-500 flex space-x-1.5">
                        <RxExclamationTriangle className="relative top-[5px]" />
                        <p>{errorMessage}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {/* <ValidateButton
                      isValid={isValid}
                      control={control}
                      onClick={handleValidateButton}
                    /> */}
                    {/* <p>{verifiedText}</p>
                    <ResetVerifiedText
                      setVerifiedText={setVerifiedText}
                      control={control}
                    /> */}
                  </div>
                </td>
                <td>
                  <InputCounter
                    name={`slug`}
                    control={control}
                    maxLength={`20`}
                  />
                </td>
              </tr>
              <tr className="flex p-2">
                <th className="w-20">アイコン</th>
                <td>
                  <label htmlFor="img" className="cursor-pointer">
                    <Image
                      src={previewUrl ?? profile.image ?? avatar2}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </label>
                  {/* TODO: 選択解除 */}
                  <input
                    type="file"
                    accept="image/*"
                    id="img"
                    className="hidden"
                    {...register("fileList", {
                      onChange: handleChangeImage,
                    })}
                  />
                  {errors.fileList && <p>{errors.fileList.message}</p>}
                </td>
              </tr>
              <tr className="flex p-2">
                <th className="w-20">表示名</th>
                <td>
                  <input
                    className="bg-transparent"
                    type="text"
                    {...register("name", {
                      value: profile.name,
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500 flex space-x-1.5">
                      <RxExclamationTriangle className="relative top-[5px]" />
                      <p>{errors.name.message}</p>
                    </div>
                  )}
                </td>
                <td>
                  <InputCounter
                    name={`name`}
                    control={control}
                    maxLength={`20`}
                  />
                </td>
              </tr>
              <tr className="flex p-2">
                <th className="w-20">紹介文</th>
                <td>
                  <textarea
                    className="bg-transparent border border-white rounded-lg"
                    {...register("description", {
                      value: profile.description,
                    })}
                  />
                  {errors.description && <p>{errors.description.message}</p>}
                </td>
                <td>
                  <InputCounter
                    name={`description`}
                    control={control}
                    maxLength={`200`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            {...{ isValid, isDirty, isSubmitting }}
            submittingText="保存中…"
            submitText="変更を保存"
          />
        </form>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
