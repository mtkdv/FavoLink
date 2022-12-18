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

export type FormValues = {
  name: string;
  fileList?: FileList;
  image?: string;
  slug: string;
  description: string;
};

const Profile: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<FormValues>({
    values: profile as FormValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // firebase storageへの保存とurlの取得
    let image;
    if (data.fileList?.[0]) {
      image = await uploadAndGetUrl(data.fileList?.[0]);
    }

    const { slug, name, description } = data;
    const body = {
      slug,
      image,
      name,
      description,
    };

    try {
      await fetch(`/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    console.log("e.target.files[0]:", e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result;
      if (res && typeof res === "string") {
        setSelectedImage(res);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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
                      src={selectedImage ?? profile.image ?? avatar2}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </label>
                  <input
                    type="file"
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
                      required: "Name is required",
                      maxLength: {
                        value: 20,
                        message: "Please less than 20 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Please more than 3 characters",
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
                      maxLength: {
                        value: 200,
                        message: "Please less than 200 characters",
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
            disabled={!isValid || !isDirty}
            className={clsx(
              "border",
              (!isValid || !isDirty) && "cursor-not-allowed"
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
