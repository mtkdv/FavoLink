import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { menuList, pagesInfo, queryKeys } from "#/const";
import { FullNavItem } from "#/components/pages/home";
import { LoginButton } from "#/components/uiParts";

export const FullNav = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  if (sessionStatus === "loading") return null;

  return (
    <nav className="fixed top-24 inset-x-0 translate-x-full h-full-nav overflow-y-auto bg-base-white invisible group-[:has(#hamburger:checked)]/header:translate-x-0 group-[:has(#hamburger:checked)]/header:visible transition-[transform,_visibility] duration-300">
      <ul className="py-14 px-8 space-y-14">
        {menuList.map((menu) => (
          <FullNavItem key={menu.title} {...{ menu }} />
        ))}

        <li className="">
          {sessionStatus === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: pagesInfo.top.href })}
              className="block py-4 px-2 w-full text-left font-light tracking-wider hover:bg-black/5 outline-none focus-visible:ring-2 ring-juniper-500 ring-inset animate-appearance transition border-b border-b-black/10"
            >
              Logout
            </button>
          ) : (
            <LoginButton size="full" />
          )}
        </li>
      </ul>
    </nav>
  );
};
