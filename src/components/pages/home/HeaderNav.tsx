import { useSession } from "next-auth/react";

import { menuList } from "#/const";
import { HeaderNavItem } from "#/components/pages/home";

export const HeaderNav = () => {
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "loading") return null;

  return (
    <nav className="animate-appearance absolute left-1/2 -translate-x-1/2">
      <ul className="flex items-center space-x-2">
        {menuList.map((menu) => (
          <HeaderNavItem key={menu.title} menu={menu} />
        ))}
      </ul>
    </nav>
  );
};
