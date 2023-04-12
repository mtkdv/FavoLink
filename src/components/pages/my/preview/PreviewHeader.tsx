import Router from "next/router";
import Link from "next/link";
import { Custom, Profile } from "@prisma/client";
import clsx from "clsx";

import { FaArrowLeft, FaShareSquare, FaUserCog } from "react-icons/fa";
import { pagesInfo } from "#/const";

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
        "fixed top-0 z-20 h-14 w-screen border-b border-white/25 pr-3.5 shadow-[0_3px_10px_-3px] shadow-black/20 backdrop-blur-sm",
        custom.mode === "LIGHT"
          ? "bg-white/20 text-base-black"
          : "bg-black/20 text-white"
      )}
    >
      <div className="h-full px-6">
        <div className="relative mx-auto h-full max-w-3xl">
          {/* L: Go Back */}
          <div className="absolute top-1/2 flex -translate-y-1/2 items-center">
            <button
              onClick={() => Router.back()}
              className={clsx(
                "group relative flex w-8 rounded-full bg-transparent p-2 outline-none ring-1 transition-[color,background-color,width] duration-300 [&:is(:hover,:focus-visible)]:w-28",
                custom.mode === "LIGHT"
                  ? "ring-base-black [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-white"
                  : "ring-white [&:is(:hover,:focus-visible)]:bg-white [&:is(:hover,:focus-visible)]:text-base-black"
              )}
            >
              <span className="absolute left-6 w-max origin-left scale-x-0 leading-4 tracking-wide opacity-0 transition-[opacity,transform,left] duration-300 group-[:is(:hover,:focus-visible)]:left-8 group-[:is(:hover,:focus-visible)]:scale-x-100 group-[:is(:hover,:focus-visible)]:opacity-100">
                Go Back
              </span>
              <FaArrowLeft size={16} className="w-4" />
            </button>
          </div>

          {/* M: Preview Mode */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* <p className="text-3xl font-medium tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-slate-800 via-slate-500 to-slate-900 drop-shadow-white-black">
          Preview Mode
        </p> */}
            <p className="text-3xl font-light tracking-wider">Preview</p>
          </div>

          {/* R: Public URL */}
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-end">
            {profile.slug && profile.published ? (
              // TODO: Tooltip
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${pagesInfo.user.href}${profile.slug}`}
                className={clsx(
                  "group relative flex w-8 rounded-full bg-transparent py-2 outline-none ring-1 transition-[color,background-color,width] duration-300 sm:w-32 [&:is(:hover,:focus-visible)]:w-32",
                  custom.mode === "LIGHT"
                    ? "ring-base-black [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-white"
                    : "ring-white [&:is(:hover,:focus-visible)]:bg-white [&:is(:hover,:focus-visible)]:text-base-black"
                )}
              >
                <span className="absolute right-0 w-max origin-right scale-x-0 text-sm font-medium leading-4 tracking-wide opacity-0 transition-[opacity,transform,right] duration-300 max-sm:group-[:is(:hover,:focus-visible)]:right-2.5 max-sm:group-[:is(:hover,:focus-visible)]:scale-x-100 max-sm:group-[:is(:hover,:focus-visible)]:opacity-100 sm:right-2.5 sm:scale-x-100 sm:opacity-100">
                  Public Page
                </span>
                <FaShareSquare className="ml-[9px] -translate-y-px" />
              </a>
            ) : (
              // TODO: Tooltip
              <Link
                href={pagesInfo.my.profile.href}
                // href={getPagesPath(["my", "profile"])}
                className={clsx(
                  "group relative flex w-8 rounded-full bg-transparent py-2 outline-none ring-1 transition-[color,background-color,width] duration-300 sm:w-[168px] [&:is(:hover,:focus-visible)]:w-[168px]",
                  custom.mode === "LIGHT"
                    ? "ring-base-black [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-white"
                    : "ring-white [&:is(:hover,:focus-visible)]:bg-white [&:is(:hover,:focus-visible)]:text-base-black"
                )}
              >
                <span className="absolute right-0 w-max origin-right scale-x-0 text-sm font-semibold leading-4 tracking-wide opacity-0 transition-[opacity,transform,right] duration-300 max-sm:group-[:is(:hover,:focus-visible)]:right-2.5 max-sm:group-[:is(:hover,:focus-visible)]:scale-x-100 max-sm:group-[:is(:hover,:focus-visible)]:opacity-100 sm:right-2.5 sm:scale-x-100 sm:opacity-100">
                  Setup Public Page
                </span>
                <FaUserCog className="ml-[9px] -translate-y-px" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
