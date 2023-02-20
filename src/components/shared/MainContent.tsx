import Image from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { Category, Custom, Link, Profile } from "@prisma/client";
import clsx from "clsx";

import { CategorizedLink } from "#/components/shared/CategorizedLink";
import silhouetteAvatar from "/public/silhouette-avatar.png";
import { PacmanLoader } from "react-spinners";
import { Loader } from "#/components/uiParts/Loader";

export const MainContent = ({
  profile,
  categories,
  videos,
  custom,
  children,
}: {
  profile: Profile;
  categories: Category[];
  videos: Link[];
  custom: Custom;
  children: React.ReactNode;
}) => {
  // const [isLoading, setIsLoading] = useState(true);

  // const handleLoadingComplete = async () => {
  //   console.log("handleLoadingComplete");
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   console.log("3000ms later");
  //   setIsLoading(false);
  // };

  // return (
  //     {/* {isLoading && <Loader color="teal" />} */}
  return (
    <div
      // className="min-h-screen pt-36 pb-6 overflow-hidden"
      className="min-h-screen pt-36 pb-6 overflow-hidden animate-appearance"
      // style={{
      //   opacity: isLoading ? 0 : 1,
      // }}
    >
      {/* ページ背景 */}
      <div className="fixed top-0 w-full h-screen -z-10">
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
        {/* <div className="h-full bg-gradient-to-r from-slate-900 to-slate-700" /> */}
      </div>

      {/* プレビューヘッダー or 設定ボタン */}
      {children}

      <main className="relative min-h-[calc(100vh_-_256px)] px-6">
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
                  src={profile.image ?? silhouetteAvatar}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-full w-20 h-20 drop-shadow-md"
                ></Image>
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

              {/* Description */}
              {/* <p className="whitespace-pre-wrap">{profile.description}</p> */}
            </div>
          </div>

          {/* Contents */}
          <div className="mt-12">
            <CategorizedLink {...{ categories, videos, custom }} />
          </div>
        </div>
      </main>

      <footer className="mt-6 flex flex-col space-y-2 items-center">
        <NextLink href="/">
          <p className="text-4xl font-black tracking-wide drop-shadow-white-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900">
            Favolink
          </p>
        </NextLink>
        <p className="text-xs drop-shadow-[1px_1px_0_white]">
          Copyright &copy; 2023 All rights reserved.
        </p>
      </footer>
    </div>
  );
};
