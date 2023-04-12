import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Custom, Profile } from "@prisma/client";
import clsx from "clsx";

import { CategorizedLink } from "#/components/shared";
import { Videos } from "#/types";
import { pagesInfo } from "#/const";
import silhouetteAvatar from "/public/silhouette-avatar.png";

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
        <div className="fixed top-0 h-screen w-screen">
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
          {/* <div className="h-full bg-white" /> */}
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
          <div className="mt relative z-10 mx-auto max-w-3xl">
            {/* Profile */}
            <div
              className={clsx(
                "relative h-32 w-full space-y-4 rounded-2xl border border-white/25 border-l-white/50 border-t-white/50 shadow-[0_5px_15px_-5px] shadow-black/20 backdrop-blur-sm",
                custom.mode === "LIGHT" ? "bg-white/20" : "bg-black/20"
              )}
            >
              <div className="absolute -top-10 left-1/2 w-full -translate-x-1/2 space-y-6 px-6">
                {/* Avatar */}
                <div className="flex min-w-max justify-center">
                  <Image
                    src={profile.image ?? silhouetteAvatar}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full drop-shadow-md"
                  />
                </div>

                {/* Name */}
                <p
                  className={clsx(
                    "break-all text-center font-semibold tracking-wide line-clamp-2",
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

        <footer className="relative my-6 flex flex-col items-center space-y-2">
          <Link
            href={pagesInfo.top.href}
            className="drop-shadow-white-black text-3xl tracking-widest outline-none ring-juniper-500 focus-visible:ring-2"
          >
            FAVOLINK
          </Link>
          <p className="text-xs drop-shadow-[1px_1px_0_white]">
            Copyright &copy; 2023 All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};
