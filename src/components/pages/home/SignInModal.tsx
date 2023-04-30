import { Dialog, Transition } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { Fragment } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiTwitter } from "react-icons/si";
import { TfiClose } from "react-icons/tfi";

import { Spacer } from "#/components/uiParts";
import {
  OAuthProvider,
  Provider,
  oAuthProviders,
  pagesInfo,
  queryKeys,
} from "#/const";
import { kleeOne } from "#/lib/nextFont";

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
        className={clsx(kleeOne.className, "relative z-50")}
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

        <div className="fixed inset-y-0 w-screen overflow-y-auto pr-3.5">
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
                  <span className="absolute -bottom-1 left-0 h-px w-full rounded-full bg-gradient-to-r from-white via-khaki-500 to-white" />
                  <span className="text-xl font-light text-liver-500">
                    Log in to FAVOLINK
                  </span>
                </Dialog.Title>

                <Spacer size={48} axis="column" />

                <div className="space-y-4 px-12">
                  {oAuthProviders.map((provider) => (
                    <OAuthLoginButton key={provider} {...{ provider }} />
                  ))}
                </div>

                <Spacer size={36} axis="column" />
                <div className="px-12">
                  <LoginButton provider="credentials">
                    <span className="font-light text-liver-500">
                      Guest Login
                    </span>
                  </LoginButton>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute bottom-full right-1 -translate-y-1 outline-none ring-juniper-500 transition hover:opacity-60 focus-visible:ring-2"
                >
                  <TfiClose size={32} className="scale-y-75 text-khaki-500" />
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

const LoginButton = ({
  provider,
  children,
}: {
  provider: Provider;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        signIn(provider, { callbackUrl: pagesInfo.top.href });
      }}
      type="button"
      className="flex w-full justify-center border border-khaki-500 bg-white px-4 py-2 outline-none transition hover:ring-khaki-400/30 focus-visible:ring-juniper-500 focus-visible:ring-offset-2 [&:is(:hover,:focus-visible)]:ring-2"
    >
      {children}
    </button>
  );
};

const OAuthLoginButton = ({ provider }: { provider: OAuthProvider }) => {
  const Icon = iconTypes[provider];

  return (
    <LoginButton provider={provider}>
      <Icon
        size={24}
        className={clsx(provider === "twitter" && "text-twitter")}
      />
      <Spacer size={8} axis="row" />
      <span className="font-light text-liver-500">
        Continue with&nbsp;
        <span className="capitalize">{provider}</span>
      </span>
    </LoginButton>
  );
};
