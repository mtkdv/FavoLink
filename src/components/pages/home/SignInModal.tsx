import { Fragment } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { VscChromeClose } from "react-icons/vsc";
import { SiTwitter } from "react-icons/si";

import { queryKeys } from "#/utils";

export const SignInModal = () => {
  const { data: isModalShow } = useQuery({
    queryKey: queryKeys.signInModal,
    initialData: false,
    enabled: false,
  });
  const queryClient = useQueryClient();

  return (
    <Transition appear show={isModalShow} as={Fragment}>
      <Dialog
        // open={isModalOpen}
        onClose={() => queryClient.setQueryData(queryKeys.signInModal, false)}
        className="relative z-50"
      >
        {/* <div className="fixed inset-0 bg-black/30" aria-hidden="true" /> */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* <div className="fixed inset-0 bg-black/25" /> */}
          <div className="fixed inset-0 bg-black/5 backdrop-blur-[1px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel className="relative w-full max-w-sm rounded-2xl bg-white py-6 px-12 border-t border-t-black/10 border-l border-l-black/10 shadow-[3px_3px_5px_rgba(0,0,0,0.1)]">
                <Dialog.Title className="text-xl font-medium text-center">
                  <span className="relative">
                    <span className="absolute bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 w-full h-0.5 -bottom-2"></span>
                    <span>Log in to FavoLink</span>
                  </span>
                </Dialog.Title>
                {/* <Dialog.Description>
                  description
                </Dialog.Description> */}
                <div className="mt-12 space-y-4">
                  <button
                    onClick={() => {
                      signIn("google", { callbackUrl: "/my/dashboard" });
                    }}
                    type="button"
                    className="flex w-full space-x-1 justify-center rounded-md border border-transparent bg-white ring-1 ring-black/30 px-4 py-2 text-sm font-medium hover:bg-stone-100/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <FcGoogle size={20} />
                    <span>Continue with Google</span>
                  </button>
                  <button
                    onClick={() => {
                      signIn("twitter", { callbackUrl: "/my/dashboard" });
                    }}
                    type="button"
                    className="flex w-full space-x-1 justify-center rounded-md border border-transparent bg-white ring-1 ring-black/30 px-4 py-2 text-sm font-medium hover:bg-stone-100/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <SiTwitter size={20} className="text-[color:#2A9BF0]" />
                    <span>Continue with Twitter</span>
                  </button>
                </div>
                <button
                  onClick={() =>
                    queryClient.setQueryData(queryKeys.signInModal, false)
                  }
                  className="absolute top-3 right-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <VscChromeClose size={20} />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
