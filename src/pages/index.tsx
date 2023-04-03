import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { MotionAbout, MotionCustomize } from "#/components/pages/home";
import { pagesInfo, publicPath, queryKeys } from "#/const";
import sample12 from "/public/sample12.png";
import sample13 from "/public/sample13.png";
import sample18 from "/public/sample18.png";
import sample19 from "/public/sample19.png";
import sample20 from "/public/sample20.png";
import { Spacer } from "#/components/uiParts";

const Home: NextPageWithLayout = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  return (
    <>
      <section className="pb-18 flex flex-col items-center overflow-x-hidden">
        <div className="mt-28 px-8 flex flex-col items-center justify-center gap-y-14">
          <h1 className="text-6xl font-black text-center">好きな動画を共有</h1>
          <p className="text-lg text-center">
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
                className="flex h-full items-center px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 animate-appearance hover:opacity-80 text-xl tracking-wider"
              >
                Login
              </button>
            ) : (
              <Link
                // href={pagesInfo.my.dashboard.href}
                href={pagesInfo.my.addVideo.href}
                className="flex h-full items-center px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 animate-appearance hover:opacity-80"
              >
                ページを作成
              </Link>
            )}
          </div>
        </div>

        <Spacer size={80} axis="column" />
        <Image
          {...publicPath.movieNight}
          alt="hero"
          priority
          className="min-w-xl"
        />
      </section>

      <section className="py-24 w-full relative bg-neutral-100">
        <div className="max-w-5xl mx-auto px-8 space-y-10">
          <div className="py-6 px-4 bg-white rounded-3xl sm:grid sm:grid-cols-12 sm:gap-x-2">
            <div className="sm:col-span-5 grid place-content-center">
              <h2 className="text-4xl font-black text-center leading-relaxed">
                カテゴリーを作成し
                <br />
                動画を登録
              </h2>
            </div>
            <MotionAbout className="sm:col-span-7">
              <Image src={sample18} alt="sample" />
            </MotionAbout>
          </div>

          <div className="py-6 px-4 bg-white rounded-3xl sm:grid sm:grid-cols-12 sm:gap-x-2">
            <div className="order-2 sm:col-span-5 grid place-content-center">
              <h2 className="text-4xl font-black text-center leading-relaxed">
                カテゴリーは５つまで
                <br />
                作成可能
              </h2>
              <p className="mt-5 text-center text-stone-500 dark:text-stone-200">
                動画はカテゴリーごとに６つまで登録可能
              </p>
            </div>
            <MotionAbout className="order-1 sm:col-span-7">
              <Image src={sample19} alt="sample" />
            </MotionAbout>
          </div>

          <div className="py-6 px-4 bg-white rounded-3xl sm:grid sm:grid-cols-12 sm:gap-x-2">
            <div className="sm:col-span-5 grid place-content-center">
              <h2 className="text-4xl font-black text-center leading-relaxed">
                気になった動画を
                <br />
                その場で再生
              </h2>
            </div>
            <MotionAbout className="max-sm:mt-5 sm:col-span-7 p-2">
              <Image src={sample20} alt="sample" className="rounded-3xl" />
            </MotionAbout>
          </div>
        </div>
      </section>

      {/* カスタマイズ */}
      <section className="pt-18 pb-28 max-w-5xl mx-auto px-8 flex flex-col items-center">
        <h2 className="text-4xl font-black">カスタマイズ</h2>

        <p className="mt-5 text-center text-stone-500 dark:text-stone-200">
          背景を自由に設定することができます。
          <br />
          背景に合わせてライトモード、ダークモードを選択できます。
        </p>

        <div className="mt-10 max-w-2xl max-xs:space-y-12 xs:grid xs:grid-cols-11">
          <MotionCustomize
            initial="offScreenLeft"
            className="max-xs:w-80 xs:col-span-5"
          >
            <Image src={sample12} alt="sample" className="rounded-xl" />
          </MotionCustomize>
          <div className="max-xs:hidden xs:col-span-1" />
          <MotionCustomize
            initial="offScreenRight"
            className="max-xs:w-80 xs:col-span-5"
          >
            <Image src={sample13} alt="sample" className="rounded-xl" />
          </MotionCustomize>
        </div>
      </section>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => {
  return <TopLayout>{page}</TopLayout>;
};

export default Home;
