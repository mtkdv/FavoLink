import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { menuList, queryKeys } from "#/const";
import { FullNavItem } from "#/components/pages/home";

export const FullNav = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  if (sessionStatus === "loading") return null;

  return (
    <nav className="fixed top-14 inset-x-0 translate-x-full h-nav overflow-y-auto bg-base-white invisible group-[:has(#hamburger:checked)]/header:translate-x-0 group-[:has(#hamburger:checked)]/header:visible transition-[transform,_visibility] duration-300">
      <ul className="py-14 px-8 space-y-14">
        {menuList.map((menu) => (
          <FullNavItem key={menu.title} {...{ menu }} />
        ))}

        <li className="">
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
              className="py-3 w-full rounded-md bg-base-black text-base-white text-lg hover:opacity-90 outline-none focus-visible:ring-2 ring-blue-500 animate-appearance"
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
