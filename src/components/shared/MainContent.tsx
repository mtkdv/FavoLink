import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Custom, Profile } from "@prisma/client";
import clsx from "clsx";

import { CategorizedLink } from "#/components/shared";
import { Videos } from "#/types";
import { pagesInfo, publicPath } from "#/const";

export const MainContent = ({
  profile,
  videos,
  custom,
  children,
}: {
  profile: Profile;
  videos: Videos;
  custom: Custom;
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* {isLoadingAll && <Loader color="red" className="h-screen" />} */}
      <div className="animate-appearance">
        {/* ページ背景 */}
        <div className="fixed top-0 w-screen h-screen">
          {custom.backgroundImage ? (
            <Image
              src={custom.backgroundImage}
              alt="公開ページの背景画像"
              fill
              priority
              // onLoadingComplete={handleLoadingComplete}
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-tr from-rose-200 via-red-300 to-yellow-200" />
          )}
          {/* <div className="h-full bg-gradient-to-tr from-rose-200 via-red-300 to-yellow-200" /> */}
          {/* <div className="h-full bg-base-white" /> */}
        </div>

        {/* プレビューヘッダー or 設定ボタン */}
        {children}

        <main className="relative mt-36 min-h-main-content px-6">
          {/* Circle */}
          {/* <div className="absolute w-full h-full">
          <div className="absolute -top-[5%] -left-40 bg-gradient-to-tr from-white/40 to-white/10 rounded-full w-[450px] h-[450px] animate-[animate_7s_infinite]"></div>
          <div className="absolute top-[30%] -right-40 bg-gradient-to-bl from-white/40 to-white/0 rounded-full w-[550px] h-[550px] animate-[animate_10s_infinite]"></div>
          <div className="absolute bottom-[3%] left-10 bg-gradient-to-br from-white/40 to-white/0 rounded-full w-[400px] h-[400px] animate-[animate_6s_infinite]"></div>
        </div> */}

          {/* Profile, Contents */}
          <div className="relative z-10 mt max-w-3xl mx-auto">
            {/* Profile */}
            <div
              className={clsx(
                "relative w-full h-32 space-y-4 border border-white/25 border-t-white/50 border-l-white/50 rounded-2xl shadow-[0_5px_15px_-5px] shadow-black/20 backdrop-blur-sm",
                custom.mode === "LIGHT" ? "bg-white/20" : "bg-black/20"
              )}
            >
              <div className="absolute left-1/2 w-full px-6 -translate-x-1/2 -top-10 space-y-6">
                {/* Avatar */}
                <div className="flex justify-center min-w-max">
                  <Image
                    src={profile.image ?? publicPath.silhouetteAvatar}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="rounded-full w-20 h-20 drop-shadow-md"
                  />
                </div>

                {/* Name */}
                <p
                  className={clsx(
                    "text-center font-semibold tracking-wide line-clamp-2 break-all",
                    custom.mode === "LIGHT" ? "text-base-black" : "text-white"
                  )}
                >
                  {profile.name}
                </p>

                {/* TODO: */}
                {/* Description */}
                {/* <p className="whitespace-pre-wrap">{profile.description}</p> */}
              </div>
            </div>

            {/* Contents */}
            <div className="mt-12">
              <CategorizedLink {...{ videos, custom }} />
            </div>
          </div>
        </main>

        <footer className="my-6 flex flex-col space-y-2 items-center">
          <Link
            href={pagesInfo.top.href}
            // href={getPagesPath(["top"])}
            className="text-4xl font-black tracking-wide drop-shadow-white-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900"
          >
            Favolink
          </Link>
          <p className="text-xs drop-shadow-[1px_1px_0_white]">
            Copyright &copy; 2023 All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};
