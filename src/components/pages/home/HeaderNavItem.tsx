import { useState } from "react";
import { Transition } from "@headlessui/react";
import { RxCaretDown } from "react-icons/rx";
import clsx from "clsx";

import { MenuItem } from "#/const/menuList";
import { useSession } from "next-auth/react";
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
        className="h-9 rounded-full hover:bg-base-black/5 transition flex space-x-0.5 items-center pl-3 pr-2"
      >
        <span className="text-sm">{menu.title}</span>
        <RxCaretDown
          className={clsx("transition delay-150", isOpen && "rotate-180")}
        />
      </button>

      <Transition
        show={isOpen}
        // show={true}
        enter="transition delay-150"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-1 scale-100"
        leave="transition delay-150"
        leaveFrom="opacity-1 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <div className="absolute pt-4 w-max">
          {/* FIXME: leaveのdelay中にbackdrop-blurが機能しなくなる。 */}
          {/* <div className="rounded-lg border shadow-md bg-base-white/90 backdrop-blur-2xl p-1.5"> */}
          <div className="rounded-lg border shadow-md bg-base-white p-1.5">
            <ul className="">
              {menu.items.map((item) => (
                <DropDownItem key={item.href} {...{ item }} />
              ))}
            </ul>
          </div>
        </div>
      </Transition>
    </li>
  );
};
