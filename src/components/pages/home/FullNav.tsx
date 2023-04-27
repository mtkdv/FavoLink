import { signOut, useSession } from "next-auth/react";

import { FullNavItem } from "#/components/pages/home";
import { LoginButton } from "#/components/uiParts";
import { menuList, pagesInfo } from "#/const";

export const FullNav = () => {
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "loading") return null;

  return (
    <nav className="invisible fixed inset-x-0 top-24 h-full-nav translate-x-full overflow-y-auto bg-base-white transition-[transform,_visibility] duration-300 group-[:has(#hamburger:checked)]/header:visible group-[:has(#hamburger:checked)]/header:translate-x-0">
      <ul className="space-y-14 px-8 py-14">
        {menuList.map((menu) => (
          <FullNavItem key={menu.title} {...{ menu }} />
        ))}

        <li className="">
          {sessionStatus === "authenticated" ? (
            <button
              onClick={() => void signOut({ callbackUrl: pagesInfo.top.href })}
              className="block w-full animate-appearance border-b border-b-black/10 px-2 py-4 text-left font-light tracking-wider outline-none ring-inset ring-juniper-500 transition hover:bg-black/5 focus-visible:ring-2"
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
