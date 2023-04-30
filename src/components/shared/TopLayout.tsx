import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";

import {
  FullNav,
  Hamburger,
  HeaderDivider,
  HeaderNav,
  SignInModal,
} from "#/components/pages/home";
import { AvatarIcon } from "#/components/shared";
import { LoginButton, Spacer, ToTopButton } from "#/components/uiParts";
import { pagesInfo } from "#/const";
import { useScreen } from "#/hooks";

export const TopLayout = ({ children }: { children: React.ReactNode }) => {
  const { status: sessionStatus } = useSession();
  const { isScreen: isMdScreen, isLoading } = useScreen("md");
  const scrollTopRef = useRef<HTMLElement>(null);

  return (
    <>
      <header className="group/header fixed top-0 z-10 h-24 w-screen pr-3.5 text-liver-500">
        <div className="absolute inset-x-0 -z-10 h-full bg-white/70 backdrop-blur group-[:has(#hamburger:checked)]/header:bg-base-white dark:bg-base-black/50 dark:text-base-white dark:group-[&:has(#hamburger:checked)]/header:bg-base-black" />

        <div className="absolute inset-x-0 z-10 mx-auto flex h-full max-w-5xl items-center pb-px pl-6 pr-10 pt-0.5">
          {/* タイトル */}
          <h1 className="text-2xl font-light tracking-[0.3rem]">
            <Link
              href={pagesInfo.top.href}
              className="text-3xl tracking-widest outline-none ring-juniper-500 focus-visible:ring-2"
            >
              FAVOLINK
            </Link>
          </h1>

          <Spacer />

          {sessionStatus !== "loading" && isLoading ? null : isMdScreen ? (
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
        className="min-h-top-main bg-white pt-24 text-liver-500 md:min-h-md-top-main"
      >
        {children}

        <ToTopButton refCurrent={scrollTopRef.current} />
      </main>

      <footer className="h-30 bg-neutral-800 text-white md:h-20">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-center gap-y-4 px-4 pt-px max-md:flex-col md:justify-between">
          <div className="flex space-x-4">
            <Link
              href={pagesInfo.terms.href}
              className="group relative outline-none ring-juniper-400 ring-offset-2 ring-offset-neutral-800 transition focus-visible:ring-2"
            >
              <span className="absolute bottom-0 h-0.5 w-full origin-right scale-x-0 rounded-full bg-white transition duration-300 group-hover:origin-left group-hover:scale-x-100" />
              <span className="transition duration-300 group-hover:text-white">
                利用規約
              </span>
            </Link>
            <Link
              href={pagesInfo.privacyPolicy.href}
              className="group relative outline-none ring-juniper-400 ring-offset-2 ring-offset-neutral-800 transition focus-visible:ring-2"
            >
              <span className="absolute bottom-0 h-0.5 w-full origin-right scale-x-0 rounded-full bg-white transition duration-300 group-hover:origin-left group-hover:scale-x-100" />
              <span className="transition duration-300 group-hover:text-white">
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
            <p className="text-sm text-neutral-300">
              Copyright &copy; 2023 FavoLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <SignInModal />
    </>
  );
};
