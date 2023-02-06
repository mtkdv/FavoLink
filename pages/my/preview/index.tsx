import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useGetProfile } from "#/lib/useGetProfile";
import { CategorizedLink } from "#/components/shared/CategorizedLink";
import { useSession } from "next-auth/react";
import silhouetteAvatar from "#/public/silhouette-avatar.png";
import Error from "next/error";
import { FaArrowLeft } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";

const Preview = () => {
  const { data: session } = useSession();
  const { data: profile, isLoading, isError, error } = useGetProfile(session);

  if (isError) {
    return <Error statusCode={404} title={error.message} />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header className="fixed z-30 bg-gradient-to-l from-gray-50/70 to-gray-200/70 top-0 h-12 w-full px-6 backdrop-blur-[2px] shadow-[0_1px_0_white]">
        <div className="relative max-w-3xl mx-auto h-full">
          {/* L: Go Back */}
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center">
            <button
              onClick={() => Router.back()}
              className="relative group flex p-2 w-8 rounded-full bg-stone-100 ring-1 ring-stone-400 [&:is(:hover,:focus-visible)]:ring-stone-500 [&:is(:hover,:focus-visible)]:w-28 transition-[shadow,width] duration-300 outline-none"
            >
              <span className="absolute pointer-events-none opacity-0 w-16 text-sm text-stone-500 leading-4 group-[:is(:hover,:focus-visible)]:opacity-100 -left-2 group-[:is(:hover,:focus-visible)]:left-9 group-[:is(:hover,:focus-visible)]:pointer-events-auto scale-x-0 group-[:is(:hover,:focus-visible)]:scale-x-100 transition-[opacity,transform,left] duration-300">
                Go Back
              </span>
              <FaArrowLeft
                size={16}
                className="text-stone-400 group-[:is(:hover,:focus-visible)]:text-stone-500 transition duration-300 w-4"
              />
            </button>
          </div>

          {/* M: Preview Mode */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <p className="text-3xl font-medium tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-slate-800 via-slate-500 to-slate-900 drop-shadow-white-black">
              Preview Mode
            </p>
            {/* <p className="text-3xl font-medium tracking-wider">Preview Mode</p> */}
          </div>

          {/* R: Public URL */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex justify-end items-center">
            {profile.slug && profile.published ? (
              // TODO: Tooltip
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/${profile.slug}`}
                className="relative flex rounded-full bg-stone-100 ring-1 ring-orange-400 p-2 outline-none overflow-hidden [&:is(:hover,:focus-visible)]:scale-105 transition-transform space-x-1 text-orange-400  [&:is(:hover,:focus-visible)]:text-orange-500 [&:is(:hover,:focus-visible)]:ring-orange-500"
              >
                <GoTriangleRight className="" />
                <span className="max-sm:hidden text-sm leading-4 tracking-wide font-semibold">
                  Public Page
                </span>
              </a>
            ) : (
              // TODO: Tooltip
              <Link
                href="/my/profile"
                className="relative flex rounded-full bg-stone-100 ring-1 ring-stone-400 p-2 outline-none overflow-hidden [&:is(:hover,:focus-visible)]:scale-105 transition-transform space-x-1 text-stone-400 [&:is(:hover,:focus-visible)]:text-stone-500 [&:is(:hover,:focus-visible)]:ring-stone-500"
              >
                <GoTriangleRight className="" />
                <span className="max-sm:hidden text-sm leading-4 tracking-wide font-semibold">
                  Setup Public Page
                </span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* <main className="mt-12"> */}
      <main className="">
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 p-6">
          {/* Circle */}
          <div className="absolute -top-[5%] -left-40 bg-gradient-to-tr from-white/40 to-white/10 rounded-full w-[450px] h-[450px] animate-[animate_7s_infinite]"></div>
          <div className="absolute top-[30%] -right-40 bg-gradient-to-bl from-white/40 to-white/0 rounded-full w-[550px] h-[550px] animate-[animate_10s_infinite]"></div>
          <div className="absolute bottom-[3%] left-10 bg-gradient-to-br from-white/40 to-white/0 rounded-full w-[400px] h-[400px] animate-[animate_6s_infinite]"></div>

          {/* Glass */}
          {/* <div className="relative mt-12 z-10 max-w-3xl mx-auto bg-gradient-to-br from-white/50 to-white/20 rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)]"> */}
          {/* <div className="relative mt-24 z-10 max-w-3xl mx-auto bg-gradient-to-br from-white/50 to-white/20 rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)]"> */}
          <div className="relative mt-24 z-10 max-w-3xl mx-auto">
            {/* Icon, Name, Description */}
            <div className="relative mt-24 z-10 max-w-3xl mx-auto bg-gradient-to-br from-white/50 to-white/20 rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
              <div className="absolute z-20 -top-10 left-6 right-6 space-y-4">
                <div className="flex justify-center">
                  <Image
                    src={profile.image ?? silhouetteAvatar}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="rounded-full w-20 h-20 drop-shadow-md"
                  ></Image>
                </div>

                {/* Name */}
                <p className="text-center font-semibold line-clamp-1 break-all">
                  {profile.name}
                </p>

                {/* Description */}
                {/* <p className="whitespace-pre-wrap">{profile.description}</p> */}
              </div>
            </div>

            {/* Contents */}
            <div className="mt-24 mb-6">
              <CategorizedLink />
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default Preview;
