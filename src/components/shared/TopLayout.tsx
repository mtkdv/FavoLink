import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Hamburger, Nav, SignInModal } from "#/components/pages/home";
import { Divider } from "#/components/uiParts";
import { pagesPath } from "#/const";
import { useGetProfile } from "#/hooks";
import silhouetteAvatar from "/public/silhouette-avatar.png";

export const TopLayout = ({ children }: { children: React.ReactNode }) => {
  const { status: sessionStatus } = useSession();
  const { data: profile, isLoading } = useGetProfile();

  return (
    <>
      <header className="group/header fixed top-0 w-screen z-10 h-14 pr-3.5 bg-base-white/50 backdrop-blur-sm [&:has(#hamburger:checked)]:bg-base-white dark:[&:has(#hamburger:checked)]:bg-base-black dark:bg-base-black/50 dark:text-base-white font-medium transition">
        <div className="h-[55px] pt-0.5 max-w-5xl mx-auto flex items-center px-4">
          {/* タイトル */}
          <h1 className="text-xl font-bold">
            <Link
              href={pagesPath.top}
              className="outline-none focus-visible:ring-2 ring-blue-500 ring-offset-2"
            >
              FavoLink
            </Link>
          </h1>

          <Nav />

          <Hamburger />

          {/* Avatar Icon */}
          {sessionStatus === "authenticated" ? (
            <div className="ml-5 flex items-center shrink-0">
              {isLoading ? (
                <div className="rounded-full w-10 h-10 bg-isabelline/75 animate-loadingPulse" />
              ) : (
                <Image
                  src={profile?.image ?? silhouetteAvatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 animate-appearance"
                />
              )}
            </div>
          ) : null}
        </div>

        <Divider classWrapper="px-2" />
      </header>

      {/* <main className="mt-14 w-screen pr-3.5 min-h-[calc(100vh_-_136px)]"> */}
      <main className="mt-14 min-h-[calc(100vh_-_136px)]">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>

      {/* <footer className="h-20 w-screen pr-3.5"> */}
      <footer className="h-20">
        <Divider classWrapper="px-2" />

        <div className="h-[79px] max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href={pagesPath.terms}>利用規約</Link>
            <Link href={pagesPath.privacyPolicy}>プライバシーポリシー</Link>
            <p>お問い合わせ</p>
          </div>
          <p>Copyright &copy; 2023 Favolink. All rights reserved.</p>
        </div>
      </footer>

      <SignInModal />
    </>
  );
};
