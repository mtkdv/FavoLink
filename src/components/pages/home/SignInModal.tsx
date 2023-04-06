import { Fragment } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiTwitter } from "react-icons/si";
import { TfiClose } from "react-icons/tfi";

import { pagesInfo, queryKeys } from "#/const";
import { Spacer } from "#/components/uiParts";
import clsx from "clsx";

export const SignInModal = () => {
  const { data: isOpen } = useQuery({
    queryKey: queryKeys.signInModal,
    initialData: false,
    enabled: false,
  });
  const queryClient = useQueryClient();

  const closeModal = () => {
    queryClient.setQueryData(queryKeys.signInModal, false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        // open={isOpen}
        onClose={closeModal}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-100/80 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-y-0 w-screen pr-3.5 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-sm bg-white py-6 shadow-[0_0_25px_-2px] shadow-khaki-500/30">
                <Dialog.Title className="relative text-center">
                  <span className="absolute left-0 -bottom-1 w-full h-px rounded-full bg-gradient-to-r from-white via-khaki-500 to-white" />
                  <span className="text-liver-500 text-xl font-light tracking-wider">
                    Log in to FAVOLINK
                  </span>
                </Dialog.Title>

                <Spacer size={48} axis="column" />

                <div className="px-12 space-y-4">
                  {/* FIXME: */}
                  {(["google", "twitter"] as const).map((type) => (
                    <LoginButton key={type} {...{ type }} />
                  ))}
                </div>

                <button
                  onClick={closeModal}
                  className="absolute bottom-full -translate-y-1 right-1 transition outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 hover:opacity-60"
                >
                  <TfiClose size={32} className="text-khaki-500 scale-y-75" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const iconTypes = {
  google: FcGoogle,
  twitter: SiTwitter,
};

const LoginButton = ({ type }: { type: "google" | "twitter" }) => {
  const Icon = iconTypes[type];

  return (
    <button
      onClick={() => {
        signIn(type, { callbackUrl: pagesInfo.top.href });
      }}
      type="button"
      className="flex w-full justify-center bg-white border border-khaki-500 px-4 py-2 transition hover:ring-2 hover:ring-khaki-400/30 outline-none focus-visible:ring-2 focus-visible:ring-juniper-500 focus-visible:ring-offset-2"
    >
      <Icon size={24} className={clsx(type === "twitter" && "text-twitter")} />
      <Spacer size={8} axis="row" />
      <span className="text-liver-500 font-light tracking-wider">
        Continue with&nbsp;
        <span className="capitalize">{type}</span>
      </span>
    </button>
  );
};
