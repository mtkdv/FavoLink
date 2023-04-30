import { useSession } from "next-auth/react";
import Link from "next/link";

import { MenuItem } from "#/const/menuList";
import { isExternal } from "#/utils";

export const FullNavItem = ({ menu }: { menu: MenuItem }) => {
  // 未認証時にDashboardをレンダリングしない。
  const { status: sessionStatus } = useSession();
  if (menu.title === "Dashboard" && sessionStatus === "unauthenticated") {
    return null;
  }

  return (
    <li className="">
      <p className="ml-1 text-sm text-stone-600">{menu.title}</p>

      <ul className="mt-2">
        {menu.items.map(({ title, href, icon }) => {
          // FIXME: /contactが未実装の間。
          if (title.en === "Contact") {
            return (
              <li key={href} className="border-b border-b-black/10">
                <Link
                  href={href}
                  onClick={(e) => e.preventDefault()}
                  tabIndex={-1}
                  className="flex cursor-not-allowed items-center space-x-1 px-2 py-4 font-light tracking-wider text-neutral-400 outline-none"
                >
                  <span>🚧</span>
                  <span>{title.en}</span>
                </Link>
              </li>
            );
          }

          return (
            <li key={href} className="border-b border-b-black/10">
              {isExternal(href) ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={href}
                  className="block px-2 py-4 font-light tracking-wider outline-none ring-inset ring-juniper-500 transition duration-300 hover:bg-black/5 focus-visible:ring-2"
                >
                  {title.en}
                </a>
              ) : (
                <Link
                  href={href}
                  className="block px-2 py-4 font-light tracking-wider outline-none ring-inset ring-juniper-500 transition duration-300 hover:bg-black/5 focus-visible:ring-2"
                >
                  {title.en}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </li>
  );
};
