import { useState } from "react";
import { useSession } from "next-auth/react";
import { Transition } from "@headlessui/react";
import { RxCaretDown } from "react-icons/rx";
import clsx from "clsx";

import { MenuItem } from "#/const/menuList";
import { DropDownItem } from "#/components/pages/home";

export const HeaderNavItem = ({ menu }: { menu: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((pre) => !pre);
  };

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  // 未認証時にDashboardをレンダリングしない。
  const { status: sessionStatus } = useSession();

  if (menu.title === "Dashboard" && sessionStatus === "unauthenticated") {
    return null;
  }

  return (
    <li
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
      className="relative"
    >
      <button
        onClick={toggleMenu}
        className="flex h-9 items-center space-x-0.5 pl-3 pr-2 outline-none ring-juniper-500 transition focus-visible:ring-2"
      >
        <span className="font-light tracking-wider">{menu.title}</span>
        <RxCaretDown
          className={clsx(
            "transition duration-200 ease-in",
            isOpen && "-scale-y-100"
          )}
        />
      </button>

      <Transition
        show={isOpen}
        // show={true}
        enter="transition delay-150 duration-500 ease-out"
        enterFrom="opacity-0 -translate-y-5"
        enterTo="opacity-1 translate-y-0"
        leave="transition"
        leaveFrom="opacity-1 translate-y-0"
        leaveTo="opacity-0 -translate-y-5"
        className="absolute pt-4"
      >
        {/* FIXME: leaveのdelay中にbackdrop-blurが機能しなくなる。 */}
        {/* <div className="rounded-lg border shadow-md bg-base-white/90 backdrop-blur-2xl p-1.5"> */}
        <ul className="bg-white p-2 shadow-[0_0_25px_-2px] shadow-khaki-800/30">
          {menu.items.map((item) => (
            <DropDownItem key={item.href} {...{ item }} />
          ))}
        </ul>
      </Transition>
    </li>
  );
};
