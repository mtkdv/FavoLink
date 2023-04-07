import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Transition } from "@headlessui/react";

import { useGetProfile } from "#/hooks";
import { pagesInfo } from "#/const";
import silhouetteAvatar from "/public/silhouette-avatar.png";

export const AvatarIcon = () => {
  const { data: profile, isLoading } = useGetProfile();
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

  return (
    <nav>
      {isLoading ? (
        <div className="rounded-full w-12 h-12 bg-isabelline/75 animate-loadingPulse" />
      ) : (
        <div
          // onMouseEnter={handleOpenMenu}
          onMouseLeave={handleCloseMenu}
          className="relative animate-appearance"
        >
          <button
            onClick={toggleMenu}
            className="block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-juniper-500 hover:ring-3 hover:ring-stone-300 transition duration-300"
          >
            <Image
              src={profile?.image ?? silhouetteAvatar}
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full w-12 h-12"
            />
          </button>

          <Transition
            show={isOpen}
            // show={true}
            enter="transition delay-150 duration-500 ease-out"
            enterFrom="opacity-0 -translate-y-5"
            enterTo="opacity-1 translate-y-0"
            leave="transition duration-500 ease-out"
            leaveFrom="opacity-1 translate-y-0"
            leaveTo="opacity-0 -translate-y-5"
            className="absolute pt-4 -right-2"
          >
            <div className="p-2 bg-white shadow-[0_5px_20px_-3px] shadow-black/20">
              <button
                onClick={() => signOut({ callbackUrl: pagesInfo.top.href })}
                className="flex w-30 px-5 h-10 items-center outline-none focus-visible:ring-2 ring-juniper-500 ring-inset animate-appearance transition duration-300 hover:translate-x-1 font-light tracking-wider"
              >
                Logout
              </button>
            </div>
          </Transition>
        </div>
      )}
    </nav>
  );
};
