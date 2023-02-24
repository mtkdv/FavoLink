import Image from "next/image";
import Link from "next/link";
import Error from "next/error";
import { useSession } from "next-auth/react";

import { Divider } from "#/components/uiParts/Divider";
import { Hamburger, Nav, SignInModal } from "#/components/pages/home";
import { useGetProfile } from "#/hooks/useGetProfile";
import silhouetteAvatar from "/public/silhouette-avatar.png";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: profile, isLoading, isError, error } = useGetProfile(session);

  if (isError) {
    // console.log("error object:", error);
    if (error.response) {
      return (
        <Error
          statusCode={error.response.status}
          title={error.response.data.message}
        />
      );
    } else {
      console.log("no response error:", error);
      // FIXME: レスポンスなしのエラー表示方法。カスタムエラーページ。
      // return <Error />
    }
  }

  return (
    <>
      <header className="group/header fixed top-0 inset-x-0 z-10 h-20 bg-base-white text-stone-600">
        <div className="max-w-3xl mx-auto px-8 h-full flex items-center">
          {/* タイトル */}
          <h1 className="text-3xl font-bold">
            <Link
              href={`/`}
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
                !isError && (
                  <Image
                    src={profile.image ?? silhouetteAvatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 animate-appearance"
                  />
                )
              )}
            </div>
          ) : null}
        </div>

        <div className="max-w-3xl mx-auto px-2">
          <Divider />
        </div>
      </header>

      <main className="mt-20 space-y-14">
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-7xl">Lorem ipsum dolor sit.</h1>
      </main>

      <footer></footer>

      <SignInModal />
    </>
  );
}
