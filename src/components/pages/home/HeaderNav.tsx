import { useSession } from "next-auth/react";

import { HeaderNavItem } from "#/components/pages/home";
import { menuList } from "#/const";

export const HeaderNav = () => {
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "loading") return null;

  return (
    <nav className="absolute left-1/2 -translate-x-1/2 animate-appearance">
      <ul className="flex items-center space-x-2">
        {menuList.map((menu) => (
          <HeaderNavItem key={menu.title} menu={menu} />
        ))}
      </ul>
    </nav>
  );
};
