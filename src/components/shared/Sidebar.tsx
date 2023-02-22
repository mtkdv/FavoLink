import { Loader } from "#/components/uiParts/Loader";
import { MENU_LIST } from "#/const/menu-list";
import { useGetProfile } from "#/hooks/useGetProfile";
import { signOut, useSession } from "next-auth/react";
import Error from "next/error";
import Image from "next/image";
import { FaShareSquare } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { SiReact } from "react-icons/si";
import { Divider } from "../uiParts/Divider";
import { LinkWithIcon } from "../uiParts/LinkWithIcon";
import silhouetteAvatar from "/public/silhouette-avatar.png";

export const Sidebar = () => {
  const { data: session } = useSession();

  const { data: profile, isLoading, isError, error } = useGetProfile(session);

  if (isError) {
    return <Error statusCode={404} title={error.message} />;
  }

  return (
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
          {/* {isLoading ? (
            <li className="h-14 md:h-12 md:px-3 flex items-center max-md:justify-center">
              <div className="h-full md:h-5 w-full md:w-24 rounded-lg md:rounded-full bg-isabelline animate-loadingPulse" />
            </li>
          ) : profile.slug && profile.published ? ( */}
          {profile?.slug && profile.published ? (
            <li className="animate-appearance">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/${profile.slug}`}
                className="h-14 flex items-center rounded-md hover:bg-isabelline outline-none focus-visible:ring-2 focus-visible:ring-offset-[3px] focus-visible:ring-accent max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3"
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
      {/* <div className="mt-4 mb-14 h-14 flex items-center md:space-x-2 max-md:justify-center md:h-12 relative"> */}
      <div className="mt-4 mb-14 h-14 md:h-12">
        {isLoading ? (
          <div className="h-full flex items-center md:space-x-2 max-md:justify-center animate-pulse">
            <div className="rounded-full w-10 h-10 shrink-0 bg-isabelline" />
            <div className="max-md:hidden rounded-full w-36 h-5 flex-1 bg-isabelline" />
          </div>
        ) : (
          <div className="h-full flex items-center md:space-x-2 max-md:justify-center animate-appearance">
            <Image
              src={profile?.image ?? silhouetteAvatar}
              alt="profile-icon"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 shrink-0"
            />

            {/* Profile Name */}
            <div className="relative group max-md:hidden flex-1">
              {/* Tooltip */}
              {/* <div className="absolute opacity-0 pointer-events-none bottom-0 w-[125%] left-1/2 -translate-x-1/2 rounded-md group-hover:pointer-events-auto group-hover:bottom-full group-hover:opacity-100 transition-[opacity,bottom] duration-300 delay-300 pb-5">
            <div className="opacity-0 p-2 bg-white rounded-md group-hover:opacity-100 transition ring-1 ring-secondary drop-shadow-sm duration-300 delay-300">
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[11px] border-t-secondary border-b-transparent border-x-transparent drop-shadow-sm"></span>
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-t-white border-b-transparent border-x-transparent"></span>

              <p className="text-sm break-all text-center">{profile?.name}</p>
            </div>
          </div> */}
              <div className="absolute opacity-0 pointer-events-none bottom-0 w-[125%] left-1/2 -translate-x-1/2 rounded-md group-hover:pointer-events-auto group-hover:bottom-full group-hover:opacity-100 transition-[opacity,bottom] duration-300 delay-300">
                {/* Top */}
                <div className="opacity-0 bg-white p-2 rounded-md group-hover:opacity-100 transition ring-1 ring-secondary drop-shadow-sm duration-300 delay-300">
                  <p className="text-sm break-all text-center">
                    {profile?.name}
                  </p>
                </div>
                {/* Bottom Arrow */}
                <div className="relative flex justify-center">
                  <span className="border-[11px] border-t-secondary border-b-transparent border-x-transparent drop-shadow-sm"></span>
                  <span className="absolute left-1/2 -translate-x-1/2 border-[10px] border-t-white border-b-transparent border-x-transparent"></span>
                </div>
              </div>

              <p className="relative z-10 text-sm line-clamp-1 break-all text-center">
                {profile?.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
