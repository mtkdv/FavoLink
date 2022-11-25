import { NextPageWithLayout } from "#/pages/_app";
import Layout from "#/components/Layout";
import { ReactElement, Suspense, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { fetchProfile, saveProfile } from "#/lib/firestore";
import { updateProfile } from "firebase/auth";
import { auth } from "#/firebase/firebase";
import useSWR from "swr";
import avatar2 from "#/public/avatar2.png";

type FormValues = {
  slug: string;
  displayName: string;
  desc: string;
};

type Profile = {
  slug: string;
  desc: string;
};

const Profile: NextPageWithLayout = () => {
  const [user, setUser] = useRecoilState(userState);
  // API Routesを介する場合
  // const { data: profile } = useSWR(`/api/profile`, async (url) => {
  //   const res = await fetch(url);
  //   return res.json();
  // });
  // API Routesを介する場合
  // const { data: profile } = useSWR(`fetchProfile`, fetchProfile);
  const { mutate } = useSWRConfig();

  // swrを使用しない場合
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    fetchProfile().then((res) => setProfile(res));
  }, [auth.currentUser]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  useEffect(() => {
    reset({
      slug: profile?.slug,
      desc: profile?.desc,
    });
  }, [profile]);
  useEffect(() => {
    reset({
      displayName: user?.displayName!,
    });
  }, [user]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // TODO: Promise.all
    // displayNameとphotoURLの更新
    await updateProfile(auth.currentUser!, {
      displayName: data.displayName,
      // photoURL: data.photoURL,
    });
    setUser((currVal) => ({
      ...currVal,
      displayName: data.displayName,
    }));

    // slugとdescの更新
    await saveProfile({
      // uid: user?.uid!,
      slug: data.slug,
      desc: data.desc,
    });
  };

  return (
    <div className="py-12 px-6">
      <h2>プロフィール編集</h2>
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
                />
              </td>
              {/* <td>{profile?.slug.length}/30</td> */}
            </tr>
            <tr className="">
              <th>アイコン</th>
              <td>
                <Image
                  src={user?.photoURL ?? avatar2}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
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
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
