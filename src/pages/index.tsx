import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { MotionCustomize } from "#/components/pages/home";
import { pagesInfo, publicPath, queryKeys, topInfo } from "#/const";
import { LoginButton, Spacer } from "#/components/uiParts";
import { Feature } from "#/components/pages/home/Feature";
import customize1 from "/public/customize1.png";
import customize2 from "/public/customize2.png";

const Home: NextPageWithLayout = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  return (
    <>
      <section className="flex flex-col items-center overflow-x-hidden pb-18">
        <div className="mt-28 flex flex-col items-center justify-center gap-y-14 px-8">
          <h1 className="text-center text-5xl">{topInfo.heading}</h1>
          <p className="text-center text-liver-400">{topInfo.paragraph}</p>

          <div className="h-12">
            {sessionStatus !== "loading" &&
            sessionStatus === "unauthenticated" ? (
              <LoginButton size="md" />
            ) : (
              <Link
                href={pagesInfo.my.addVideo.href}
                className="group relative block h-12 animate-appearance bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-600 px-8 outline-none ring-juniper-500 ring-offset-1 transition focus-visible:ring-2"
              >
                <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-neutral-700 opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="relative flex h-full items-center text-white">
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
      <section className="relative w-full bg-stone-150 py-24">
        <ul className="mx-auto max-w-5xl space-y-14 px-8">
          {topInfo.features.map((feature) => (
            <Feature key={feature.image} {...{ feature }} />
          ))}
        </ul>
      </section>

      {/* カスタマイズ紹介 */}
      <section className="mx-auto flex max-w-5xl flex-col px-8 pb-28 pt-18">
        <h2 className="text-center text-3xl">{topInfo.customize.heading}</h2>
        <Spacer size={20} axis="column" />
        <p className="flex flex-col text-center text-liver-400">
          {topInfo.customize.paragraphs.map((paragraph) => (
            <span key={paragraph}>{paragraph}</span>
          ))}
        </p>
        <Spacer size={40} axis="column" />
        <div className="mx-auto w-full max-w-2xl px-6 max-xs:space-y-12 xs:grid xs:grid-cols-11">
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
