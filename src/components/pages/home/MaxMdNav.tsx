import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

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

export const MaxMdNav = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  return (
    <nav className="absolute top-[81px] inset-x-0 translate-x-full h-[calc(100vh_-_81px)] bg-base-white opacity-0 group-[:has(#hamburger:checked)]/header:translate-x-0 group-[:has(#hamburger:checked)]/header:opacity-100 transition duration-300">
      <ul className="mt-12 px-8">
        {/* Menu list */}
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

        {/* Login menu */}
        <li className="border-b border-b-black/10">
          {sessionStatus === "loading" ? null : sessionStatus ===
            "unauthenticated" ? (
            <button
              onClick={() => queryClient.setQueryData(["signInModal"], true)}
              className="block py-4 px-2 w-full text-left hover:bg-black/5 outline-none focus-visible:ring-2 ring-blue-500 animate-appearance"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="block py-4 px-2 w-full text-left hover:bg-black/5 outline-none focus-visible:ring-2 ring-blue-500 animate-appearance"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
