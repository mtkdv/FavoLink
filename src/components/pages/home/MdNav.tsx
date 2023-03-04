import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "#/utils";

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

export const MdNav = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  return (
    <nav className="ml-10 flex-1 max-md:hidden animate-appearance">
      <ul className="flex items-center space-x-4">
        {/* Menu-list */}
        {MENU_LIST.map(({ title, href }) => (
          <li key={title}>
            <Link
              href={href}
              className="group py-2 px-2 outline-none focus-visible:ring-2 ring-blue-500"
            >
              <span className="relative">
                <span className="absolute -bottom-1 w-full h-0.5 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 transition duration-300 scale-x-0 origin-right group-hover:origin-left group-hover:scale-x-100" />
                {title}
              </span>
            </Link>
          </li>
        ))}

        {/* Login menu */}
        <li className="!ml-auto">
          {sessionStatus === "loading" ? null : sessionStatus ===
            "unauthenticated" ? (
            <button
              onClick={() =>
                queryClient.setQueryData(queryKeys.signInModal, true)
              }
              className="py-1.5 px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-blue-500 animate-appearance hover:opacity-80"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="py-1.5 px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-blue-500 animate-appearance hover:opacity-80"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
