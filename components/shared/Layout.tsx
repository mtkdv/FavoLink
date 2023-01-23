import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import avatar2 from "#/public/avatar2.png";
import Link from "next/link";
import React, { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { IoHome, IoLogOut, IoLogoYoutube } from "react-icons/io5";
import { RiMagicFill, RiUser5Fill } from "react-icons/ri";
import { FaEye, FaShareSquare } from "react-icons/fa";
import { LinkWithIcon } from "../uiParts/LinkWithIcon";
import { useGetProfile } from "#/lib/useGetProfile";
import Error from "next/error";
import { SiReact } from "react-icons/si";

const MENU_LIST = [
  {
    title: "Top Page",
    href: "/",
    icon: <IoHome />,
  },
  {
    title: "Dashboard",
    href: "/my/dashboard",
    icon: <MdSpaceDashboard />,
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
  const [isShow, setIsShow] = useState(false);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    <Error statusCode={404} title={error.message} />;
  }

  return (
    <div className="max-h-screen overflow-y-hidden bg-[#FBF7F5] text-[color:#1D1D1D]">
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
                    <div className="w-8 md:w-3/4 mx-auto h-px bg-[color:#EEE6E2] my-4"></div>
                  ) : null}
                  <LinkWithIcon {...menu} />
                </li>
              ))}
              <li>
                {profile?.slug && profile.published ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/${profile.slug}`}
                    className={clsx(
                      "h-14 flex items-center rounded-md",
                      "hover:bg-[color:#EEE6E2]",
                      "max-md:flex-col max-md:justify-center max-md:space-y-1",
                      "md:h-12 md:space-x-2 md:px-3"
                    )}
                  >
                    <FaShareSquare />
                    <p className="text-xs md:hidden">Public</p>
                    <p className="text-sm max-md:hidden">Public Page</p>
                  </a>
                ) : null}
              </li>
            </ul>
          </nav>

          {/* User */}
          <div className="mt-auto mb-4 w-8 mx-auto md:w-3/4 min-h-[1px] bg-[color:#EEE6E2]"></div>
          <nav className="mb-14">
            <ul className="space-y-2 md:space-y-4">
              <li>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={clsx(
                    "h-14 flex items-center rounded-md w-full",
                    "hover:bg-[color:#EEE6E2]",
                    "max-md:flex-col max-md:justify-center max-md:space-y-1",
                    "md:h-12 md:space-x-2 md:px-3"
                  )}
                >
                  <IoLogOut size={20} />
                  <p className="text-sm max-md:text-xs">Logout</p>
                </button>
              </li>
              <li>
                <div className="h-14 flex items-center max-md:justify-center md:h-12 relative">
                  <div className="">
                    <Image
                      src={profile?.image ?? avatar2}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <p
                    onMouseEnter={() => {
                      setTimeout(() => {
                        setIsShow(true);
                      }, 500);
                    }}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        setIsShow(false);
                      }, 500);
                    }}
                    className="max-md:hidden text-sm line-clamp-1 flex-1 mx-2 break-all text-center"
                  >
                    {profile?.name}
                  </p>
                  {isShow ? (
                    // TODO: Tooltip CSS
                    <div className="absolute pointer-events-none translate-y-10 translate-x-8 p-3 bg-[#EEE6E2]/60 rounded-md">
                      <p className="text-sm">{profile?.name}</p>
                    </div>
                  ) : null}
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right */}
        <div className="flex-1 my-4 mr-4 w-lg overflow-x-hidden">
          <div className="h-[calc(100vh_-_32px)] bg-white border-2 border-[color:#EEE6E2] p-4 pr-1 overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
