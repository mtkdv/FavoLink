import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import avatar2 from "#/public/avatar2.png";
import React, { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { IoHome, IoLogOut, IoLogoYoutube } from "react-icons/io5";
import {
  RiDashboardFill,
  RiHomeSmileFill,
  RiMagicFill,
  RiUser5Fill,
  RiYoutubeFill,
} from "react-icons/ri";
import { FaEye, FaShareSquare } from "react-icons/fa";
import { LinkWithIcon } from "../uiParts/LinkWithIcon";
import { useGetProfile } from "#/lib/useGetProfile";
import Error from "next/error";
import { SiReact } from "react-icons/si";

const MENU_LIST = [
  {
    title: "Top Page",
    href: "/",
    icon: <RiHomeSmileFill />,
  },
  {
    title: "Dashboard",
    href: "/my/dashboard",
    icon: <RiDashboardFill />,
  },
  {
    title: "Profile",
    href: "/my/profile",
    icon: <RiUser5Fill />,
  },
  {
    title: "Add Video",
    href: "/my/like_url",
    icon: <IoLogoYoutube />,
  },
  {
    title: "Customize",
    href: "/my/customize",
    icon: <RiMagicFill />,
  },
  {
    title: "Preview",
    href: "/my/preview",
    icon: <FaEye />,
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const { data: profile, isLoading, isError, error } = useGetProfile(session);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    <Error statusCode={404} title={error.message} />;
  }

  return (
    <div className="max-h-screen overflow-y-hidden bg-primary text-[color:#1D1D1D]">
      <div className="max-w-3xl mx-auto flex">
        {/* Left */}
        <div className="h-screen w-20 md:w-60 px-2 md:px-6 flex flex-col overflow-y-scroll scrollbar-hidden">
          {/* Logo */}
          <div className="relative min-h-[128px]">
            <div className="absolute flex flex-col items-center left-1/2 -translate-x-1/2 top-[60%] -translate-y-1/2">
              {/* TODO: logo作成 */}
              <SiReact
                size={40}
                className="animate-[spin_10s_linear_infinite] text-[color:#61DAFB]"
              />
              <span className="text-2xl font-extrabold tracking-wider max-md:hidden">
                FavoLink
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="mb-4">
            <ul className="space-y-2 md:space-y-4">
              {MENU_LIST.map((menu) => (
                <li key={menu.title} className="">
                  {menu.title === "Preview" ? (
                    <div className="w-8 md:w-3/4 mx-auto h-px bg-secondary my-4"></div>
                  ) : null}
                  <LinkWithIcon {...menu} />
                </li>
              ))}
              {/* Public Page */}
              <li>
                {profile?.slug && profile.published ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/${profile.slug}`}
                    className="h-14 flex items-center rounded-md hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-offset-[3px] focus-visible:ring-accent max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3"
                  >
                    <FaShareSquare />
                    <p className="text-xs md:hidden">Public</p>
                    <p className="text-sm max-md:hidden">Public Page</p>
                  </a>
                ) : null}
              </li>
            </ul>
          </nav>

          {/* TODO: Dividerへの書き換え */}
          <div className="mt-auto mb-4 w-8 mx-auto md:w-3/4 min-h bg-secondary"></div>

          {/* Logout & Avatar */}
          <nav className="mb-14">
            <ul className="space-y-2 md:space-y-4">
              {/* Logout Button */}
              <li>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="h-14 flex items-center rounded-md w-full hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-offset-[3px] focus-visible:ring-accent max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3 transition-shadow"
                >
                  <IoLogOut size={20} />
                  <p className="text-sm max-md:text-xs">Logout</p>
                </button>
              </li>
              <li>
                <div className="h-14 flex items-center md:space-x-2 max-md:justify-center md:h-12 relative">
                  <Image
                    src={profile?.image ?? avatar2}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 shrink-0"
                  />
                  <div className="group">
                    {/* Tooltip */}
                    <div className="absolute invisible opacity-0 bottom-full p-2 bg-secondary rounded-md group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] delay-500">
                      {/* Bottom Arrow */}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-[color:#EEE6E2_transparent_transparent]"></span>
                      <p className="text-sm">{profile?.name}</p>
                    </div>

                    <p className="max-md:hidden text-sm line-clamp-1 flex-1 break-all text-center">
                      {profile?.name}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right */}
        <div className="relative flex-1 my-4 mr-4 overflow-x-hidden overflow-y-hidden">
          {/* スクロールバー表示時のコンテンツとの境界線 */}
          {/* <div className="absolute right-[14px] w-px h-full bg-secondary/70"></div> */}

          <div
            id="scroll-element"
            className="h-[calc(100vh_-_32px)] bg-white border-2 border-secondary px-4 py-8 overflow-y-scroll"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
