import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useGetProfile } from "#/hooks/useGetProfile";
import { CategorizedLink } from "#/components/shared/CategorizedLink";
import { useSession } from "next-auth/react";
import silhouetteAvatar from "/public/silhouette-avatar.png";
import Error from "next/error";
import { FaArrowLeft, FaShareSquare, FaUserCog } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { useGetLinks } from "#/hooks/useGetLinks";
import { useGetCategories } from "#/hooks/useGetCategories";
import { useGetCustom } from "#/hooks";
import clsx from "clsx";

const Preview = () => {
  const { data: session } = useSession();
  // const {
  //   data: profile,
  //   isLoading: isLoadingProfile,
  //   // isError: isProfileError,
  //   status: profileStatus,
  //   error: profileError,
  // } = useGetProfile(session);
  // const {
  //   data: videos,
  //   isLoading: isLoadingVideos,
  //   // isError: isVideosError,
  //   status: videosStatus,
  //   error: videosError,
  // } = useGetLinks(session);
  // const {
  //   data: categories,
  //   isLoading: isLoadingCategories,
  //   // isError: isCategoriesError,
  //   status: categoriesStatus,
  //   error: categoriesError,
  // } = useGetCategories(session);

  const profileResult = useGetProfile(session);
  const customResult = useGetCustom(session);
  const videosResult = useGetLinks(session);
  const categoriesResult = useGetCategories(session);

  if (profileResult.isError) {
    // return <Error statusCode={profileResult.error.code} title={profileResult.error.message} />;
    return <Error statusCode={404} title={profileResult.error.message} />;
  } else if (customResult.isError) {
    return <Error statusCode={404} />;
  } else if (videosResult.isError) {
    return <Error statusCode={404} />;
  } else if (categoriesResult.isError) {
    return <Error statusCode={404} />;
  }

  if (
    profileResult.isLoading ||
    customResult.isLoading ||
    videosResult.isLoading ||
    categoriesResult.isLoading
  ) {
    return <p>Loading...</p>;
  }

  const { data: profile } = profileResult;
  const { data: custom } = customResult;
  const { data: videos } = videosResult;
  const { data: categories } = categoriesResult;

  // TODO: public pageとの違い：header、背景画像、Circle
  return (
    // <div className="min-h-screen bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 pt-36 pb-6 overflow-hidden">
    <div className="min-h-screen pt-36 pb-6 overflow-hidden">
      <div className="fixed top-0 w-full h-screen -z-10">
        {custom.backgroundImage ? (
          <Image
            src={custom.backgroundImage}
            alt="公開ページの背景画像"
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full bg-gradient-to-tr from-rose-200 via-red-300 to-yellow-200" />
        )}
        {/* <div className="h-full bg-gradient-to-r from-slate-900 to-slate-700" /> */}
      </div>

      <header
        className={clsx(
          "fixed z-20 top-0 h-14 w-full px-6 border-b border-white/25 shadow-[0_3px_10px_-3px] shadow-black/20 backdrop-blur-sm",
          custom.mode === "LIGHT"
            ? "bg-white/20 text-base-black"
            : "bg-black/20 text-white"
        )}
      >
        <div className="relative max-w-3xl mx-auto h-full">
          {/* L: Go Back */}
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center">
            <button
              onClick={() => Router.back()}
              className={clsx(
                "relative group flex p-2 w-8 rounded-full bg-transparent ring-1 [&:is(:hover,:focus-visible)]:w-28 transition-[color,background-color,width] duration-300 outline-none",
                custom.mode === "LIGHT"
                  ? "ring-base-black [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-white"
                  : "ring-white [&:is(:hover,:focus-visible)]:bg-white [&:is(:hover,:focus-visible)]:text-base-black"
              )}
            >
              <span className="absolute w-max opacity-0 scale-x-0 leading-4 tracking-wide group-[:is(:hover,:focus-visible)]:opacity-100 left-6 group-[:is(:hover,:focus-visible)]:left-8 group-[:is(:hover,:focus-visible)]:scale-x-100 origin-left transition-[opacity,transform,left] duration-300">
                Go Back
              </span>
              <FaArrowLeft size={16} className="w-4" />
            </button>
          </div>

          {/* M: Preview Mode */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            {/* <p className="text-3xl font-medium tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-slate-800 via-slate-500 to-slate-900 drop-shadow-white-black">
              Preview Mode
            </p> */}
            <p className="text-3xl tracking-wider font-light">Preview</p>
          </div>

          {/* R: Public URL */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex justify-end items-center">
            {profile.slug && profile.published ? (
              // TODO: Tooltip
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/${profile.slug}`}
                className={clsx(
                  "relative group flex rounded-full bg-transparent ring-1 py-2 w-8 outline-none [&:is(:hover,:focus-visible)]:w-32 transition-[color,background-color,width] duration-300 sm:w-32",
                  custom.mode === "LIGHT"
                    ? "ring-base-black [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-white"
                    : "ring-white [&:is(:hover,:focus-visible)]:bg-white [&:is(:hover,:focus-visible)]:text-base-black"
                )}
              >
                <span className="absolute right-0 w-max opacity-0 scale-x-0 origin-right text-sm leading-4 tracking-wide font-medium max-sm:group-[:is(:hover,:focus-visible)]:opacity-100 max-sm:group-[:is(:hover,:focus-visible)]:scale-x-100 max-sm:group-[:is(:hover,:focus-visible)]:right-2.5 transition-[opacity,transform,right] duration-300 sm:opacity-100 sm:scale-x-100 sm:right-2.5">
                  Public Page
                </span>
                <FaShareSquare className="ml-[9px] -translate-y-px" />
              </a>
            ) : (
              // TODO: Tooltip
              <Link
                href="/my/profile"
                className={clsx(
                  "relative group flex rounded-full bg-transparent ring-1 py-2 w-8 outline-none [&:is(:hover,:focus-visible)]:w-[168px] transition-[color,background-color,width] duration-300 sm:w-[168px]",
                  custom.mode === "LIGHT"
                    ? "ring-base-black [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-white"
                    : "ring-white [&:is(:hover,:focus-visible)]:bg-white [&:is(:hover,:focus-visible)]:text-base-black"
                )}
              >
                <span className="absolute right-0 w-max opacity-0 scale-x-0 origin-right text-sm leading-4 tracking-wide font-semibold max-sm:group-[:is(:hover,:focus-visible)]:opacity-100 max-sm:group-[:is(:hover,:focus-visible)]:scale-x-100 max-sm:group-[:is(:hover,:focus-visible)]:right-2.5 transition-[opacity,transform,right] duration-300 sm:opacity-100 sm:scale-x-100 sm:right-2.5">
                  Setup Public Page
                </span>
                <FaUserCog className="ml-[9px] -translate-y-px" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* <main className="mt-12"> */}
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
          {/* <div className="relative w-full h-32 space-y-4 bg-gradient-to-br from-white/50 to-white/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)]"> */}
          {/* <div className="relative w-full h-32 space-y-4 bg-white/20 text-base-black border-2 border-white/50 rounded-2xl shadow-[0_5px_15px_-5px] shadow-black/20 backdrop-blur-sm"> */}
          <div
            className={clsx(
              "relative w-full h-32 space-y-4 border border-white/25 border-t-white/50 border-l-white/50 rounded-2xl shadow-[0_5px_15px_-5px] shadow-black/20 backdrop-blur-sm",
              custom.mode === "LIGHT"
                ? "bg-white/20 text-base-black"
                : "bg-black/20 text-white"
            )}
          >
            <div className="absolute left-1/2 w-full px-6 -translate-x-1/2 -top-10 space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <Image
                  src={profile.image ?? silhouetteAvatar}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-full min-w-[80px] h-20 drop-shadow-md"
                ></Image>
              </div>

              {/* Name */}
              <p className="text-center font-semibold tracking-wide line-clamp-2 break-all">
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
        <Link href="/">
          <p className="text-4xl font-black tracking-wide drop-shadow-white-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900">
            Favolink
          </p>
        </Link>
        <p className="text-xs drop-shadow-[1px_1px_0_white]">
          Copyright &copy; 2023 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Preview;
