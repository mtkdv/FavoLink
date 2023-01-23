import { useGetProfile } from "#/lib/useGetProfile";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { Dispatch, FC, SetStateAction } from "react";

const MENU_LIST = [
  {
    title: "Dashboard",
    href: "/my/dashboard",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

type Props = {
  isMenuOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const Navbar: FC<Props> = ({ isMenuOpen, setIsModalOpen }) => {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);

  return (
    <nav
      className={clsx(
        "max-md:absolute max-md:bg-white top-20 right-0 max-md:h-[calc(100vh_-_80px)] transition-all duration-300",
        "md:opacity-100",
        !isMenuOpen && "left-full opacity-0",
        isMenuOpen && "left-0 opacity-100"
      )}
    >
      <ul className="flex max-md:flex-col max-md:mt-12 max-md:px-8 md:space-x-4">
        {/* Menu list */}
        {MENU_LIST.map(({ title, href }) => (
          <li
            key={title}
            className="flex items-center border-b border-b-black/10 transition-all md:border-b-0"
          >
            <Link
              href={href}
              className="py-4 px-2 w-full max-md:hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="group md:relative">
                <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                <span>{title}</span>
              </span>
            </Link>
          </li>
        ))}

        {/* Login menu */}
        <li className="flex items-center border-b border-b-black/10 transition-all md:border-b-0">
          {session && profile && !profile.hasOwnProperty("message") ? (
            <button
              onClick={() => signOut()}
              className="py-4 px-2 w-full max-md:hover:bg-black/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="group md:relative">
                <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                <span>Logout</span>
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-4 px-2 w-full max-md:hover:bg-black/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="group md:relative">
                <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                <span>Login</span>
              </span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
