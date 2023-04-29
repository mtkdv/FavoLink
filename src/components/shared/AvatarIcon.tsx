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

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav>
      {isLoading ? (
        <div className="h-12 w-12 animate-loadingPulse rounded-full bg-isabelline/75" />
      ) : (
        <div
          onMouseLeave={handleCloseMenu}
          className="relative animate-appearance"
        >
          <button
            onClick={toggleMenu}
            className="block rounded-full outline-none transition duration-300 hover:ring-3 hover:ring-stone-300 focus-visible:ring-2 focus-visible:ring-juniper-500 focus-visible:ring-offset-1"
          >
            <Image
              src={profile?.image ?? silhouetteAvatar}
              alt="avatar"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
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
            className="absolute -right-2 pt-4"
          >
            <div className="bg-white p-2 shadow-[0_5px_20px_-3px] shadow-black/20">
              <button
                onClick={() =>
                  void signOut({ callbackUrl: pagesInfo.top.href })
                }
                className="flex h-10 w-30 animate-appearance items-center px-5 font-light tracking-wider outline-none ring-inset ring-juniper-500 transition duration-300 hover:translate-x-1 focus-visible:ring-2"
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
