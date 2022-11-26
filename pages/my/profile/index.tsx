import { NextPageWithLayout } from "#/pages/_app";
import Layout from "#/components/Layout";
import { ReactElement } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchProfile, saveProfile } from "#/lib/firestore";
import { auth } from "#/firebase/firebase";
import useSWR from "swr";
import avatar2 from "#/public/avatar2.png";

type FormValues = {
  displayName: string;
  // photoURL: string;
  slug: string;
  desc: string;
};

const Profile: NextPageWithLayout = () => {
  const [user, setUser] = useRecoilState(userState);

  const { data: profile } = useSWR(
    () => auth.currentUser?.uid,
    // () => user.uid,
    (uid) => fetchProfile(uid)
  );

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
    // firestoreの更新
    saveProfile({
      uid: auth.currentUser!.uid,
      displayName: data.displayName,
      // photoURL: data.photoURL,
      slug: data.slug,
      desc: data.desc,
    });
  };

  if (!profile) return <p>loading...</p>;
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
                  src={user.photoURL ?? avatar2}
                  // src={profile.photoURL ?? avatar2}
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
