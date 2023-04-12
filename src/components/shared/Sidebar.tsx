import Image from "next/image";
import { signOut } from "next-auth/react";
import { FaShareSquare } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

import { Divider, LinkWithIcon } from "#/components/uiParts";
import { useGetProfile } from "#/hooks";
import { pagesInfo, sideMenuList } from "#/const";
import silhouetteAvatar from "/public/silhouette-avatar.png";

export const Sidebar = () => {
  const { data: profile, isLoading } = useGetProfile();

  return (
    <div className="scrollbar-hidden flex h-screen w-20 flex-col overflow-y-scroll px-2 pt-4 md:w-60 md:px-6">
      {/* Logo */}
      <div className="relative min-h-[128px] max-md:hidden">
        <div className="absolute left-1/2 top-[60%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          {/* TODO: logo作成 */}
          {/* <SiReact
            size={40}
            className="animate-[spin_10s_linear_infinite] text-cocoa-400"
          /> */}
          {/* <span className="text-3xl font-light tracking-widest">FAVOLINK</span> */}
          <h2
            // className="text-3xl tracking-widest bg-clip-text text-transparent bg-gradient-to-br from-liver-500 via-liver-400 to-liver-500 outline-none focus-visible:ring-2 ring-juniper-500"
            className="text-3xl tracking-widest outline-none ring-juniper-500 focus-visible:ring-2"
          >
            FAVOLINK
          </h2>
        </div>
      </div>

      {/* Menu */}
      <nav className="grow">
        <ul className="flex h-full flex-col space-y-2 md:space-y-4">
          {sideMenuList.map((menu) => (
            <li key={menu.href}>
              {menu.title.en === "Preview" && (
                <Divider width="w-3/4" classWrapper="max-md:mt-2 mb-4" />
              )}
              <LinkWithIcon {...menu} />
            </li>
          ))}

          {/* Public Page */}
          {profile?.slug && profile.published && (
            <li className="animate-appearance">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${pagesInfo.user.href}${profile.slug}`}
                className="flex h-14 items-center rounded-md text-liver-500 outline-none ring-juniper-500 transition hover:bg-stone-300 focus-visible:ring-2 max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3"
              >
                <FaShareSquare />
                <p className="text-xs md:hidden">Public</p>
                <p className="font-light tracking-wider max-md:hidden">
                  Public Page
                </p>
              </a>
            </li>
          )}

          {/* Logout Button */}
          <li className="!mt-auto space-y-4">
            <Divider width="w-3/4" classWrapper="mt-4" />

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: pagesInfo.top.href })}
              className="flex h-14 w-full items-center rounded-md text-liver-500 outline-none ring-juniper-500 transition hover:bg-stone-300 focus-visible:ring-2 max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3"
            >
              <IoLogOut size={20} />
              <p className="max-md:text-xs md:font-light md:tracking-wider">
                Logout
              </p>
            </button>
          </li>
        </ul>
      </nav>

      {/* Profile Icon */}
      <div className="mb-14 mt-4 h-14 md:h-12">
        {isLoading ? (
          <div className="flex h-full animate-pulse items-center max-md:justify-center md:space-x-2">
            <div className="h-10 w-10 shrink-0 rounded-full bg-isabelline" />
            <div className="h-5 w-36 flex-1 rounded-full bg-isabelline max-md:hidden" />
          </div>
        ) : (
          <div className="flex h-full animate-appearance items-center max-md:justify-center md:space-x-2">
            <Image
              src={profile?.image ?? silhouetteAvatar}
              alt="profile-icon"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full"
            />

            {/* Profile Name */}
            <div className="group relative flex-1 max-md:hidden">
              {/* Tooltip */}
              {/* <div className="absolute opacity-0 pointer-events-none bottom-0 w-[125%] left-1/2 -translate-x-1/2 rounded-md group-hover:pointer-events-auto group-hover:bottom-full group-hover:opacity-100 transition-[opacity,bottom] duration-300 delay-300 pb-5">
            <div className="opacity-0 p-2 bg-white rounded-md group-hover:opacity-100 transition ring-1 ring-secondary drop-shadow-sm duration-300 delay-300">
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[11px] border-t-secondary border-b-transparent border-x-transparent drop-shadow-sm"></span>
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-t-white border-b-transparent border-x-transparent"></span>

              <p className="text-sm break-all text-center">{profile?.name}</p>
            </div>
          </div> */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 w-[125%] -translate-x-1/2 rounded-md opacity-0 transition-[opacity,bottom] delay-300 duration-300 group-hover:pointer-events-auto group-hover:bottom-full group-hover:opacity-100">
                {/* Top */}
                <div className="rounded-md bg-white p-2 opacity-0 drop-shadow-sm transition delay-300 duration-300 group-hover:opacity-100">
                  <p className="break-all text-center text-sm">
                    {profile?.name}
                  </p>
                </div>
                {/* Bottom Arrow */}
                <div className="relative flex justify-center">
                  <span className="border-t-secondary border-[11px] border-x-transparent border-b-transparent drop-shadow-sm"></span>
                  <span className="absolute left-1/2 -translate-x-1/2 border-[10px] border-x-transparent border-b-transparent border-t-white"></span>
                </div>
              </div>

              <p className="relative z-10 break-all text-center text-sm line-clamp-1">
                {profile?.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
