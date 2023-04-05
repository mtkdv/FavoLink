import { useSession } from "next-auth/react";

import { MenuItem } from "#/const/menuList";
import Link from "next/link";
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
                  className="flex py-4 px-2 font-light tracking-wider outline-none items-center space-x-1 cursor-not-allowed text-neutral-400"
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
                  className="block py-4 px-2 font-light tracking-wider hover:bg-black/5 outline-none focus-visible:ring-2 ring-juniper-500 ring-inset transition duration-300"
                >
                  {title.en}
                </a>
              ) : (
                <Link
                  href={href}
                  className="block py-4 px-2 font-light tracking-wider hover:bg-black/5 outline-none focus-visible:ring-2 ring-juniper-500 ring-inset transition duration-300"
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
