import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/Layout";
import { ReactElement, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchProfile, updateProfile } from "#/lib/firestore";
import useSWR from "swr";
import avatar2 from "#/public/avatar2.png";
import { uploadAndGetUrl } from "#/lib/firebaseStorage";
import { useQuery } from "@tanstack/react-query";

type FormValues = {
  displayName: string;
  fileList?: FileList;
  photoURL?: string;
  slug: string;
  desc: string;
};

const Profile: NextPageWithLayout = () => {
  const user = useRecoilValue(userState);

  // const { data: profile } = useSWR(
  //   // () => auth.currentUser?.uid,
  //   () => user.uid,
  //   (uid) => fetchProfile(uid)
  // );
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(user.uid),
    enabled: !!user,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({
    // "react-hook-form": "^7.40.0-next.1"
    values: profile,
    // defaultValues: fetchProfile,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // firebase/storageへの保存とurlの取得
    let photoURL;
    if (data.fileList?.[0]) {
      photoURL = await uploadAndGetUrl(data.fileList?.[0]);
    }
    // firestoreの更新
    updateProfile({
      // uid: auth.currentUser!.uid,
      uid: user.uid,
      displayName: data.displayName,
      // imageFile: data.fileList?.[0],
      photoURL: photoURL ?? profile?.photoURL,
      slug: data.slug,
      desc: data.desc,
    });
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
      {profile ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="border border-gray-400 rounded-lg">
            <tbody>
              <tr className="">
                <th>slug</th>
                <td>
                  <input
                    className="bg-transparent text-white"
                    type="text"
                    {...register("slug")}
                    // {...register("slug", {
                    //   onChange: (e) => console.log(e.target.value),
                    // })}
                    // onChange={onChange}
                  />
                </td>
                {/* <td>{profile?.slug.length}/30</td> */}
              </tr>
              <tr className="">
                <th>アイコン</th>
                <td>
                  <label htmlFor="img" className="cursor-pointer">
                    <Image
                      src={selectedImage ?? profile.photoURL ?? avatar2}
                      // src={profile.photoURL ?? avatar2}
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
              <tr className="">
                <th>表示名</th>
                <td>
                  <input
                    className="bg-transparent text-white"
                    type="text"
                    {...register("displayName")}
                  />
                </td>
                {/* <td>{user?.displayName?.length}/20</td> */}
              </tr>
              <tr className="">
                <th>紹介文</th>
                <td>
                  <textarea
                    className="bg-transparent text-white border border-white rounded-lg"
                    {...register("desc")}
                  />
                </td>
                <td>{}/20</td>
              </tr>
            </tbody>
          </table>
          <button type="submit">保存</button>
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
