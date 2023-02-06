import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { IoLogOut, IoLogoYoutube } from "react-icons/io5";
import {
  RiDashboardFill,
  RiHomeSmileFill,
  RiMagicFill,
  RiUser5Fill,
} from "react-icons/ri";
import { FaEye, FaShareSquare } from "react-icons/fa";
import { LinkWithIcon } from "../uiParts/LinkWithIcon";
import { useGetProfile } from "#/lib/useGetProfile";
import Error from "next/error";
import { SiReact } from "react-icons/si";
import { Divider } from "../uiParts/Divider";
import silhouetteAvatar from "#/public/silhouette-avatar.png";

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
          <nav className="grow">
            <ul className="h-full flex flex-col space-y-2 md:space-y-4">
              {MENU_LIST.map((menu) => (
                <li key={menu.title}>
                  {menu.title === "Preview" ? (
                    // <div className="w-8 md:w-3/4 mx-auto h-px bg-secondary mb-4"></div>
                    <div className="mb-4">
                      <Divider width="w-8 md:w-3/4" />
                    </div>
                  ) : null}
                  <LinkWithIcon {...menu} />
                </li>
              ))}

              {/* Public Page */}
              {profile?.slug && profile.published ? (
                <li>
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
                </li>
              ) : null}

              {/* Logout Button */}
              <li className="!mt-auto space-y-4">
                <div className="mt-4">
                  <Divider width="w-8 md:w-3/4" />
                </div>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="h-14 flex items-center rounded-md w-full hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-offset-[3px] focus-visible:ring-accent max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3 transition-shadow"
                >
                  <IoLogOut size={20} />
                  <p className="text-sm max-md:text-xs">Logout</p>
                </button>
              </li>
            </ul>
          </nav>

          {/* Profile Icon */}
          <div className="mt-4 mb-14 h-14 flex items-center md:space-x-2 max-md:justify-center md:h-12 relative">
            <Image
              src={profile?.image ?? silhouetteAvatar}
              alt="profile-icon"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 shrink-0"
            />

            {/* Profile Name */}
            <div className="relative group flex-1">
              {/* Tooltip */}
              <div className="absolute invisible opacity-0 bottom-[175%] w-[125%] left-1/2 -translate-x-1/2 p-2 bg-white rounded-md group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] delay-500 ring-1 ring-secondary drop-shadow-sm drop">
                {/* Bottom Arrow */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-[11px] border-t-secondary border-b-transparent border-x-transparent drop-shadow-sm"></span>
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-t-white border-b-transparent border-x-transparent"></span>

                <p className="text-sm break-all text-center">{profile?.name}</p>
              </div>

              <p className="max-md:hidden text-sm line-clamp-1 break-all text-center">
                {profile?.name}
              </p>
            </div>
          </div>
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
