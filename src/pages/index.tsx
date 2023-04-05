import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { MotionAbout, MotionCustomize } from "#/components/pages/home";
import { pagesInfo, publicPath, queryKeys } from "#/const";
import { Spacer } from "#/components/uiParts";
import { topInfo } from "#/const/topInfo";
import sample12 from "/public/sample12.png";
import sample13 from "/public/sample13.png";
import sample18 from "/public/sample18.png";
import sample19 from "/public/sample19.png";
import sample20 from "/public/sample20.png";

const Home: NextPageWithLayout = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  return (
    <>
      <section className="pb-18 flex flex-col items-center overflow-x-hidden">
        <div className="mt-28 px-8 flex flex-col items-center justify-center gap-y-14">
          <h1 className="text-5xl text-center">{topInfo.heading}</h1>
          <p className="text-lg text-center">{topInfo.paragraph}</p>

          <div className="h-12">
            {sessionStatus === "loading" ? null : sessionStatus ===
              "unauthenticated" ? (
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
                // className="flex px-8 h-12 items-center bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-600 text-white outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 animate-appearance transition hover:opacity-80"
                className="block relative group w-40 h-12 bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-600 outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 animate-appearance transition"
              >
                <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-neutral-700 opacity-0 transition duration-500 group-hover:opacity-100" />
                {/* <span className="absolute center text-white"> */}
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

      <section className="py-24 w-full relative bg-stone-150">
        <div className="max-w-5xl mx-auto px-8 space-y-10">
          <div className="py-6 px-4 bg-white rounded-3xl sm:grid sm:grid-cols-12 sm:gap-x-2">
            <div className="sm:col-span-5 grid place-content-center">
              <h2 className="text-4xl text-center leading-relaxed">
                {topInfo.features[0].heading.map((heading, index) => (
                  <>
                    {index !== 0 && <br />}
                    {heading}
                  </>
                ))}
              </h2>
            </div>
            <MotionAbout className="sm:col-span-7">
              <Image src={sample18} alt="sample" />
            </MotionAbout>
          </div>

          <div className="py-6 px-4 bg-white rounded-3xl sm:grid sm:grid-cols-12 sm:gap-x-2">
            <div className="order-2 sm:col-span-5 grid place-content-center">
              <h2 className="text-4xl text-center leading-relaxed">
                {topInfo.features[1].heading.map((heading, index) => (
                  <>
                    {index !== 0 && <br />}
                    {heading}
                  </>
                ))}
              </h2>
              <Spacer size={20} axis="column" />
              <p className="text-center dark:text-stone-200">
                {topInfo.features[1].paragraph!.map((paragraph, index) => (
                  <>
                    {index !== 0 && <br />}
                    {paragraph}
                  </>
                ))}
              </p>
            </div>
            <MotionAbout className="order-1 sm:col-span-7">
              <Image src={sample19} alt="sample" />
            </MotionAbout>
          </div>

          <div className="py-6 px-4 bg-white rounded-3xl sm:grid sm:grid-cols-12 sm:gap-x-2">
            <div className="sm:col-span-5 grid place-content-center">
              <h2 className="text-4xl text-center leading-relaxed">
                {topInfo.features[2].heading.map((heading, index) => (
                  <>
                    {index !== 0 && <br />}
                    {heading}
                  </>
                ))}
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
        <h2 className="text-4xl">{topInfo.features[3].heading}</h2>
        <Spacer size={20} axis="column" />
        <p className="text-center dark:text-stone-200">
          {topInfo.features[3].paragraph!.map((paragraph, index) => (
            <>
              {index !== 0 && <br />}
              {paragraph}
            </>
          ))}
        </p>
        <Spacer size={40} axis="column" />
        <div className="max-w-2xl max-xs:space-y-12 xs:grid xs:grid-cols-11">
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
