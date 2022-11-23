import { NextPageWithLayout } from "#/pages/_app";
import Layout from "#/components/Layout";
import { ReactElement } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  uid: string;
  name: string;
  introduction: string;
};

const Profile: NextPageWithLayout = () => {
  const user = useRecoilValue(userState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {};

  return (
    <div className="py-12 px-6">
      <h2>プロフィール編集</h2>
      <form onClick={handleSubmit(onSubmit)}>
        <div className="border border-gray-400 rounded-lg">
          <tbody>
            <tr className="">
              <th>ID</th>
              <td>
                <input
                  className="bg-transparent text-white"
                  type="text"
                  value={user!.uid ?? "hoge"}
                  {...register("uid")}
                />
              </td>
              <td>{user!.uid.length}/30</td>
            </tr>
            <tr className="">
              <th>アイコン</th>
              <td>
                <Image
                  src={user!.photoURL ?? "sample.jpg"}
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
                  value={user!.displayName ?? "hoge"}
                  {...register("name")}
                />
              </td>
              <td>{user!.displayName?.length}/20</td>
            </tr>
            <tr className="">
              <th>表示名</th>
              <td>
                <textarea
                  className="bg-transparent text-white"
                  {...register("introduction")}
                />
              </td>
              <td>{}/20</td>
            </tr>
          </tbody>
        </div>
        <button type="submit">保存</button>
      </form>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
