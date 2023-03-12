import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import { menuList, queryKeys } from "#/const";
import { HeaderNavItem } from "#/components/pages/home";

export const HeaderNav = () => {
  const { status: sessionStatus } = useSession();
  const queryClient = useQueryClient();

  if (sessionStatus === "loading") return null;

  return (
    // <nav className="ml-auto max-md:hidden animate-appearance">
    <nav className="animate-appearance">
      <ul className="flex items-center space-x-2">
        {menuList.map((menu) => (
          <HeaderNavItem key={menu.title} menu={menu} />
        ))}

        {/* Login/Logout */}
        {/* <li className="!ml-auto"> */}
        <li className="">
          {sessionStatus === "unauthenticated" ? (
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
              className="py-1.5 px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black text-sm outline-none focus-visible:ring-2 ring-blue-500 animate-appearance hover:opacity-80"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
