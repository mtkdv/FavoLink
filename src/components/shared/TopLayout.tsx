import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useSession } from "next-auth/react";

import {
  FullNav,
  Hamburger,
  HeaderNav,
  SignInModal,
} from "#/components/pages/home";
import { Divider, Spacer, ToTopButton } from "#/components/uiParts";
import { pagesInfo, publicPath } from "#/const";
import { useGetProfile, useScreen } from "#/hooks";

export const TopLayout = ({ children }: { children: React.ReactNode }) => {
  const { status: sessionStatus } = useSession();
  const { data: profile, isLoading } = useGetProfile();
  const isMdScreen = useScreen("md");
  const scrollTopRef = useRef<HTMLElement>(null);

  return (
    <>
      <header className="group/header fixed top-0 w-screen z-10 h-14 pr-3.5 font-medium transition">
        <div className="absolute inset-x-0 -z-10 bg-base-white/50 backdrop-blur-sm h-full group-[:has(#hamburger:checked)]/header:bg-base-white dark:group-[&:has(#hamburger:checked)]/header:bg-base-black dark:bg-base-black/50 dark:text-base-white" />

        <div className="h-full pb-px pt-0.5 max-w-5xl mx-auto flex items-center px-4">
          {/* タイトル */}
          <h1 className="text-xl font-bold">
            <Link
              href={pagesInfo.top.href}
              className="outline-none focus-visible:ring-2 ring-blue-500 ring-offset-2"
            >
              FavoLink
            </Link>
          </h1>

          <Spacer />

          {sessionStatus !== "loading" && (
            <>
              {isMdScreen ? (
                <HeaderNav />
              ) : (
                <>
                  <Hamburger />
                  <FullNav />
                </>
              )}

              {/* Avatar Icon */}
              {sessionStatus === "authenticated" && (
                <div className="ml-5 flex items-center shrink-0">
                  {isLoading ? (
                    <div className="rounded-full w-10 h-10 bg-isabelline/75 animate-loadingPulse" />
                  ) : (
                    <Image
                      src={profile?.image ?? publicPath.silhouetteAvatar}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 animate-appearance"
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="absolute bottom-0 w-full pr-3.5">
          <Divider classWrapper="px-2" />
        </div>
      </header>

      <main
        ref={scrollTopRef}
        className="pt-14 min-h-top-main md:min-h-md-top-main"
      >
        {children}

        <ToTopButton refCurrent={scrollTopRef.current} />
      </main>

      <footer className="h-30 md:h-20">
        <div className="absolute w-full">
          <Divider classWrapper="px-2" />
        </div>

        <div className="h-full max-w-5xl mx-auto px-4 pt-px flex max-md:flex-col justify-center gap-y-4 md:justify-between items-center">
          <div className="flex space-x-4">
            <Link href={pagesInfo.terms.href} className="relative group">
              <span className="absolute bottom-0 w-full h-0.5 bg-base-black/70 scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition duration-300" />
              <span className="group-hover:text-base-black transition duration-300">
                利用規約
              </span>
            </Link>
            <Link
              href={pagesInfo.privacyPolicy.href}
              className="relative group"
            >
              <span className="absolute bottom-0 w-full h-0.5 bg-base-black/70 scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition duration-300" />
              <span className="group-hover:text-base-black transition duration-300">
                プライバシーポリシー
              </span>
            </Link>
            <Link
              onClick={(e) => e.preventDefault()}
              tabIndex={-1}
              href={pagesInfo.contact.href}
              className="cursor-not-allowed text-stone-400"
            >
              🚧 お問い合わせ
            </Link>
          </div>
          <div className="">
            <p className="text-zinc-400 text-sm">
              Copyright &copy; 2023 FavoLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <SignInModal />
    </>
  );
};
