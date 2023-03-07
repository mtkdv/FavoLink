import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { pagesPath, queryKeys } from "#/const";

const MENU_LIST = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const MaxMdNav = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  if (sessionStatus === "loading") return null;

  return (
    <nav className="absolute top-14 inset-x-0 translate-x-full h-nav bg-base-white opacity-0 group-[:has(#hamburger:checked)]/header:translate-x-0 group-[:has(#hamburger:checked)]/header:opacity-100 transition duration-300">
      <ul className="mt-12 px-8">
        {sessionStatus === "authenticated" && (
          <li className="border-b border-b-black/10">
            <Link
              // href={pagesPath.my.dashboard}
              href={pagesPath.my.addVideo}
              className="block py-4 px-2 hover:bg-black/5 outline-none focus-visible:ring-2 ring-blue-500"
            >
              Dashboard
            </Link>
          </li>
        )}

        {/* About, Contact */}
        {MENU_LIST.map(({ title, href }) => (
          <li key={title} className="border-b border-b-black/10">
            <Link
              href={href}
              className="block py-4 px-2 hover:bg-black/5 outline-none focus-visible:ring-2 ring-blue-500"
            >
              {title}
            </Link>
          </li>
        ))}

        {/* Login/Logout */}
        <li className="border-b border-b-black/10">
          {sessionStatus === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="block py-4 px-2 w-full text-left hover:bg-black/5 outline-none focus-visible:ring-2 ring-blue-500 animate-appearance"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() =>
                queryClient.setQueryData(queryKeys.signInModal, true)
              }
              className="block py-4 px-2 w-full text-left hover:bg-black/5 outline-none focus-visible:ring-2 ring-blue-500 animate-appearance"
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
