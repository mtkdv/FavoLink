import Router from "next/router";
import clsx from "clsx";
import { FaArrowLeft, FaShareSquare, FaUserCog } from "react-icons/fa";
import Link from "next/link";
import { Custom, Profile } from "@prisma/client";
import { pagesPath } from "#/const";

export const PreviewHeader = ({
  profile,
  custom,
}: {
  profile: Profile;
  custom: Custom;
}) => {
  return (
    <header
      className={clsx(
        "fixed z-20 top-0 h-14 w-screen pr-3.5 border-b border-white/25 shadow-[0_3px_10px_-3px] shadow-black/20 backdrop-blur-sm",
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
              href={pagesPath.my.profile}
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
  );
};
