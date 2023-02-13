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
  const videosResult = useGetLinks(session);
  const categoriesResult = useGetCategories(session);

  if (profileResult.isError) {
    // return <Error statusCode={profileResult.error.code} title={profileResult.error.message} />;
    return <Error statusCode={404} title={profileResult.error.message} />;
  }
  if (videosResult.isError) {
    return <Error statusCode={404} />;
  } else if (categoriesResult.isError) {
    return <Error statusCode={404} />;
  }

  if (
    profileResult.isLoading ||
    videosResult.isLoading ||
    categoriesResult.isLoading
  ) {
    return <p>Loading...</p>;
  }

  const { data: profile } = profileResult;
  const { data: videos } = videosResult;
  const { data: categories } = categoriesResult;

  // TODO: public pageとの違いはheaderの有無のみ。
  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 pt-36 pb-6 overflow-hidden">
      <header className="fixed z-20 bg-gradient-to-l from-gray-50/70 to-gray-200/70 top-0 h-12 w-full px-6 backdrop-blur-[2px] shadow-[0_1px_0_white]">
        <div className="relative max-w-3xl mx-auto h-full">
          {/* L: Go Back */}
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center">
            <button
              onClick={() => Router.back()}
              className="relative group flex p-2 w-8 rounded-full bg-transparent ring-1 ring-stone-400 [&:is(:hover,:focus-visible)]:ring-stone-500 [&:is(:hover,:focus-visible)]:w-28 transition-[box-shadow,width] duration-300 outline-none"
            >
              <span className="absolute w-max opacity-0 scale-x-0 text-sm text-stone-500 leading-4 tracking-wide group-[:is(:hover,:focus-visible)]:opacity-100 left-0 group-[:is(:hover,:focus-visible)]:left-9 group-[:is(:hover,:focus-visible)]:scale-x-100 origin-left transition-[opacity,transform,left] duration-300">
                Go Back
              </span>
              <FaArrowLeft
                size={16}
                className="text-stone-400 group-[:is(:hover,:focus-visible)]:text-stone-500 transition duration-300 w-4"
              />
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
                className="relative group flex rounded-full bg-transparent ring-1 ring-orange-400 py-2 w-8 outline-none text-orange-400 [&:is(:hover,:focus-visible)]:text-orange-500 [&:is(:hover,:focus-visible)]:w-32 [&:is(:hover,:focus-visible)]:ring-2 transition-[color,box-shadow,width] duration-300 sm:w-32"
              >
                <span className="absolute right-0 w-max opacity-0 scale-x-0 origin-right text-sm leading-4 tracking-wide font-semibold max-sm:group-[:is(:hover,:focus-visible)]:opacity-100 max-sm:group-[:is(:hover,:focus-visible)]:scale-x-100 max-sm:group-[:is(:hover,:focus-visible)]:right-2.5 transition-[opacity,transform,right] duration-300 sm:opacity-100 sm:scale-x-100 sm:right-2.5">
                  Public Page
                </span>
                <FaShareSquare className="ml-[9px] -translate-y-px" />
              </a>
            ) : (
              // TODO: Tooltip
              <Link
                href="/my/profile"
                className="relative group flex rounded-full bg-transparent ring-1 ring-stone-400 py-2 w-8 outline-none text-stone-400  [&:is(:hover,:focus-visible)]:text-stone-500 [&:is(:hover,:focus-visible)]:w-[168px] [&:is(:hover,:focus-visible)]:ring-2 transition-[color,box-shadow,width] duration-300 sm:w-[168px]"
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
      {/* <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 px-6"> */}
      <main className="relative min-h-[calc(100vh_-_256px)] px-6">
        {/* Circle */}
        <div className="absolute w-full h-full">
          <div className="absolute -top-[5%] -left-40 bg-gradient-to-tr from-white/40 to-white/10 rounded-full w-[450px] h-[450px] animate-[animate_7s_infinite]"></div>
          <div className="absolute top-[30%] -right-40 bg-gradient-to-bl from-white/40 to-white/0 rounded-full w-[550px] h-[550px] animate-[animate_10s_infinite]"></div>
          <div className="absolute bottom-[3%] left-10 bg-gradient-to-br from-white/40 to-white/0 rounded-full w-[400px] h-[400px] animate-[animate_6s_infinite]"></div>
        </div>

        {/* Profile, Contents */}
        <div className="relative z-10 mt max-w-3xl mx-auto">
          {/* Profile */}
          <div className="relative w-full h-32 space-y-4 bg-gradient-to-br from-white/50 to-white/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
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
              <p className="text-center font-semibold line-clamp-2 break-all">
                {profile.name}
              </p>

              {/* Description */}
              {/* <p className="whitespace-pre-wrap">{profile.description}</p> */}
            </div>
          </div>

          {/* Contents */}
          <div className="mt-12">
            <CategorizedLink {...{ categories, videos }} />
          </div>
        </div>
      </main>

      <footer className="mt-6 flex flex-col space-y-2 items-center">
        <Link href="/">
          <p className="text-4xl font-black tracking-wide drop-shadow-white-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900">
            Favolink
          </p>
        </Link>
        <p className="text-xs text-stone-500 drop-shadow-[0_1px_0_white]">
          Copyright &copy; 2023 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Preview;
