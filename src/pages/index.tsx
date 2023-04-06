import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { MotionCustomize } from "#/components/pages/home";
import { pagesInfo, publicPath, queryKeys, topInfo } from "#/const";
import { Spacer } from "#/components/uiParts";
import { Feature } from "#/components/pages/home/Feature";
import customize1 from "/public/customize1.png";
import customize2 from "/public/customize2.png";

const Home: NextPageWithLayout = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  return (
    <>
      <section className="pb-18 flex flex-col items-center overflow-x-hidden">
        <div className="mt-28 px-8 flex flex-col items-center justify-center gap-y-14">
          <h1 className="text-5xl text-center">{topInfo.heading}</h1>
          <p className="text-liver-400 text-center">{topInfo.paragraph}</p>

          <div className="h-12">
            {sessionStatus !== "loading" &&
            sessionStatus === "unauthenticated" ? (
              <button
                onClick={() =>
                  queryClient.setQueryData(queryKeys.signInModal, true)
                }
                className="relative group w-28 h-12 bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-600 outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 animate-appearance transition"
              >
                <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-neutral-700 opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="absolute center text-white text-lg font-light tracking-widest">
                  {topInfo.login}
                </span>
              </button>
            ) : (
              <Link
                // href={pagesInfo.my.dashboard.href}
                href={pagesInfo.my.addVideo.href}
                className="block relative group w-40 h-12 bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-600 outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 animate-appearance transition"
              >
                <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-neutral-700 opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="absolute w-full h-full flex justify-center items-center text-white">
                  {topInfo.createPage}
                </span>
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

      {/* 機能紹介 */}
      <section className="py-24 w-full relative bg-stone-150">
        <ul className="max-w-5xl mx-auto px-8 space-y-14">
          {topInfo.features.map((feature) => (
            <Feature key={feature.image} {...{ feature }} />
          ))}
        </ul>
      </section>

      {/* カスタマイズ紹介 */}
      <section className="pt-18 pb-28 max-w-5xl mx-auto px-8 flex flex-col">
        <h2 className="text-3xl text-center">{topInfo.customize.heading}</h2>
        <Spacer size={20} axis="column" />
        <p className="flex flex-col text-liver-400 text-center">
          {topInfo.customize.paragraphs.map((paragraph) => (
            <span key={paragraph}>{paragraph}</span>
          ))}
        </p>
        <Spacer size={40} axis="column" />
        <div className="w-full max-w-2xl mx-auto max-xs:space-y-12 xs:grid xs:grid-cols-11">
          <MotionCustomize
            initial="offScreenLeft"
            className="flex justify-center xs:col-span-5"
          >
            <Image
              src={customize1}
              width={320}
              alt="light-mode"
              className="rounded-xl"
            />
          </MotionCustomize>
          <div className="max-xs:hidden xs:col-span-1" />
          <MotionCustomize
            initial="offScreenRight"
            className="flex justify-center xs:col-span-5"
          >
            <Image
              src={customize2}
              width={320}
              alt="dark-mode"
              className="rounded-xl"
            />
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
