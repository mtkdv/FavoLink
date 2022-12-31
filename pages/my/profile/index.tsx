import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/Layout";
import { ReactElement, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import avatar2 from "#/public/avatar2.png";
import { uploadAndGetUrl } from "#/lib/firebaseStorage";
import { useGetProfile } from "#/lib/useGetProfile";
import { useSession } from "next-auth/react";
import { InputCounter } from "#/components/InputCounter";
import clsx from "clsx";
import { usePatchProfile } from "#/lib/usePatchProfile";
import { ResetVerifiedText } from "#/components/ResetVerifiedText";
import axios from "axios";
import { ValidateButton } from "#/components/ValidateButton";
import { toast } from "react-hot-toast";
import { Profile } from "@prisma/client";

export type FormValues = {
  name: string;
  fileList: FileList;
  slug: string | null;
  description: string | null;
};

const Profile: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [verifiedText, setVerifiedText] = useState("");
  const { mutateAsync } = usePatchProfile();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid, defaultValues },
  } = useForm<FormValues>({
    // valuesオプションでの初期値の設定には型を変更する必要がありそう。
    // values: profile as FormValues,
  });

  /**
   * @param {string | null} fData.slug 初期値はschema.prismaのString?によりnull
   */
  const onSubmit: SubmitHandler<FormValues> = async (fData) => {
    setVerifiedText("");

    if (session === null || session.user === undefined) return;
    const { id } = session.user;

    if (typeof fData.slug === "string") {
      if (fData.slug.length) {
        /** 重複チェック */
        try {
          const { data: profiles } = await axios.get<Profile[]>(
            `/api/query/profiles`,
            {
              params: {
                id,
                slug: fData.slug,
              },
            }
          );
          if (profiles.length > 0) {
            toast.error(
              "そのURLはすでに他の人により使用されています。\n他のURLを設定し直してください。"
            );
            return;
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        fData.slug = null;
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
                      className="bg-transparent text-white border border-slate-500 px-3 rounded-r-md flex-1 outline-none hover:border-slate-400 transition-all"
                      type="text"
                      {...register("slug", {
                        value: profile.slug,
                        maxLength: {
                          value: 20,
                          message: "Please less than 20 characters",
                        },
                        minLength: {
                          value: 3,
                          message: "Please more than 3 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]*$/,
                          message: "Please a-zA-Z0-9 characters",
                        },
                      })}
                    />
                    {errors.slug && <p>{errors.slug.message}</p>}
                  </div>
                  <div className="flex space-x-2">
                    {/* <ValidateButton
                      isValid={isValid}
                      control={control}
                      onClick={handleValidateButton}
                    /> */}
                    <p>{verifiedText}</p>
                    <ResetVerifiedText
                      setVerifiedText={setVerifiedText}
                      control={control}
                    />
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
                  <input
                    type="file"
                    accept="image/*"
                    id="img"
                    className="hidden"
                    {...register("fileList", {
                      onChange: handleChangeImage,
                    })}
                  />
                </td>
              </tr>
              <tr className="flex p-2">
                <th className="w-20">表示名</th>
                <td>
                  <input
                    className="bg-transparent text-white"
                    type="text"
                    {...register("name", {
                      value: profile.name,
                      required: "Name is required",
                      maxLength: {
                        value: 20,
                        message: "Please less than 20 characters",
                      },
                      validate: (value) => {
                        return (
                          !!value.trim() || "空白文字のみの入力はできません"
                        );
                      },
                    })}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
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
                    className="bg-transparent text-white border border-white rounded-lg"
                    {...register("description", {
                      value: profile.description,
                      maxLength: {
                        value: 200,
                        message: "Please less than 200 characters",
                      },
                      validate: (value) => {
                        if (value) {
                          return (
                            !!value.trim() || "空白文字のみの入力はできません"
                          );
                        }
                      },
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
          <button
            type="submit"
            // disabled={!isValid || !isDirty}
            className={clsx(
              "border"
              // (!isValid || !isDirty) && "cursor-not-allowed"
            )}
          >
            保存
          </button>
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
