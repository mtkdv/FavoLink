import Link from "next/link";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import {
  FullNav,
  Hamburger,
  HeaderDivider,
  HeaderNav,
  SignInModal,
} from "#/components/pages/home";
import { LoginButton, Spacer, ToTopButton } from "#/components/uiParts";
import { pagesInfo, queryKeys } from "#/const";
import { useScreen } from "#/hooks";
import { AvatarIcon } from "#/components/shared";

export const TopLayout = ({ children }: { children: React.ReactNode }) => {
  const { status: sessionStatus } = useSession();
  const isMdScreen = useScreen("md");
  const scrollTopRef = useRef<HTMLElement>(null);

  const queryClient = useQueryClient();

  return (
    <>
      <header className="group/header fixed top-0 w-screen z-10 h-24 pr-3.5 text-liver-500">
        <div className="absolute inset-x-0 -z-10 bg-white/70 backdrop-blur h-full group-[:has(#hamburger:checked)]/header:bg-base-white dark:group-[&:has(#hamburger:checked)]/header:bg-base-black dark:bg-base-black/50 dark:text-base-white" />

        <div className="absolute inset-x-0 z-10 h-full pb-px pt-0.5 max-w-5xl mx-auto flex items-center pl-6 pr-10">
          {/* タイトル */}
          <h1 className="text-2xl font-light tracking-[0.3rem]">
            <Link
              href={pagesInfo.top.href}
              className="text-3xl tracking-widest outline-none focus-visible:ring-2 ring-juniper-500"
            >
              FAVOLINK
            </Link>
          </h1>

          <Spacer />

          {sessionStatus !== "loading" && isMdScreen ? (
            <>
              <HeaderNav />
              {sessionStatus === "unauthenticated" ? (
                <LoginButton size="sm" />
              ) : (
                sessionStatus === "authenticated" && <AvatarIcon />
              )}
            </>
          ) : (
            <>
              <Hamburger />
              <FullNav />
            </>
          )}
        </div>

        <HeaderDivider />
      </header>

      <main
        ref={scrollTopRef}
        className="pt-24 min-h-top-main md:min-h-md-top-main bg-white text-liver-500"
      >
        {children}

        <ToTopButton refCurrent={scrollTopRef.current} />
      </main>

      <footer className="h-30 md:h-20 bg-neutral-800 text-white">
        <div className="h-full max-w-5xl mx-auto px-4 pt-px flex max-md:flex-col justify-center gap-y-4 md:justify-between items-center">
          <div className="flex space-x-4">
            <Link
              href={pagesInfo.terms.href}
              className="relative group outline-none focus-visible:ring-2 ring-juniper-400 ring-offset-2 ring-offset-neutral-800 transition"
            >
              <span className="absolute bottom-0 w-full h-0.5 bg-white rounded-full scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition duration-300" />
              <span className="group-hover:text-white transition duration-300">
                利用規約
              </span>
            </Link>
            <Link
              href={pagesInfo.privacyPolicy.href}
              className="relative group outline-none focus-visible:ring-2 ring-juniper-400 ring-offset-2 ring-offset-neutral-800 transition"
            >
              <span className="absolute bottom-0 w-full h-0.5 bg-white rounded-full scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition duration-300" />
              <span className="group-hover:text-white transition duration-300">
                プライバシーポリシー
              </span>
            </Link>
            <Link
              onClick={(e) => e.preventDefault()}
              tabIndex={-1}
              href={pagesInfo.contact.href}
              className="cursor-not-allowed text-neutral-400"
            >
              🚧 お問い合わせ
            </Link>
          </div>
          <div className="">
            <p className="text-neutral-300 text-sm">
              Copyright &copy; 2023 FavoLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <SignInModal />
    </>
  );
};
