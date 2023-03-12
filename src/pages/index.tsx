import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { Divider } from "#/components/uiParts";
import { pagesInfo, queryKeys } from "#/const";
import sample17 from "/public/sample17.png";
import sample16 from "/public/sample16.png";
import sample14 from "/public/sample14.png";
import sample12 from "/public/sample12.png";
import sample13 from "/public/sample13.png";

const Home: NextPageWithLayout = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  return (
    <>
      <section className="flex flex-col items-center">
        <div className="mt-28 flex flex-col items-center justify-center gap-y-14">
          <h1 className="text-6xl font-black">好きな動画を共有</h1>
          <p className="text-lg">
            好きな YouTube 動画を集めた、あなただけのページを作成し、SNS
            で公開しよう
          </p>

          <div className="h-11">
            {sessionStatus === "loading" ? null : sessionStatus ===
              "unauthenticated" ? (
              <button
                onClick={() =>
                  queryClient.setQueryData(queryKeys.signInModal, true)
                }
                className="py-2 px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-blue-500 animate-appearance hover:opacity-80 text-xl"
              >
                Login
              </button>
            ) : (
              <Link
                // href={pagesInfo.my.dashboard.href}
                href={pagesInfo.my.addVideo.href}
                className="py-2 px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-blue-500 animate-appearance hover:opacity-80"
              >
                ページを作成
              </Link>
            )}
          </div>
        </div>

        {/* TODO:  */}
        <div className="mt-20">
          <Image
            // TODO: pathを管理する。
            src="/undraw_movie_night_re_9umk.svg"
            width={845}
            height={332}
            alt="hero"
          />
        </div>
      </section>

      <Divider classWrapper="w-full" />

      <section className="mt-28 w-full space-y-20">
        <div className="grid grid-cols-12">
          <div className="col-span-5 grid place-content-center">
            <h2 className="text-4xl font-black text-center leading-relaxed">
              カテゴリーを作成し
              <br />
              動画を登録
            </h2>
          </div>
          <Image src={sample14} alt="sample" className="col-span-7" />
        </div>

        <div className="grid grid-cols-12">
          <Image src={sample17} alt="sample" className="col-span-7" />
          <div className="col-span-5 grid place-content-center">
            <h2 className="text-4xl font-black text-center leading-relaxed">
              カテゴリーは５つまで
              <br />
              作成可能
            </h2>
            <p className="mt-5 text-center text-stone-500 dark:text-stone-200">
              動画はカテゴリーごとに６つまで登録可能
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-12">
          <div className="col-span-5 grid place-content-center">
            <h2 className="text-4xl font-black text-center leading-relaxed">
              気になった動画を
              <br />
              その場で再生
            </h2>
          </div>
          <Image
            src={sample16}
            alt="sample"
            className="col-span-7 rounded-3xl"
          />
        </div>
      </section>

      <section className="mt-36 mb-28 w-full flex flex-col items-center">
        <h2 className="text-4xl font-black">カスタマイズ</h2>
        <p className="mt-5 text-center text-stone-500 dark:text-stone-200">
          背景を自由に設定することができます。
          <br />
          背景に合わせてライトモード、ダークモードを選択できます。
        </p>
        {/* <div className="mt-14 w-full flex justify-center gap-x-16"> */}
        <div className="mt-14 flex justify-center gap-x-16">
          <Image src={sample12} alt="sample" className="rounded-xl max-w-xs" />
          <Image src={sample13} alt="sample" className="rounded-xl max-w-xs" />
          {/* <Image src={sample12} alt="sample" className="rounded-xl" />
          <Image src={sample13} alt="sample" className="rounded-xl" /> */}
        </div>
      </section>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => {
  return <TopLayout>{page}</TopLayout>;
};

export default Home;
