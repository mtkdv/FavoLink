import Image from "next/image";
import Link from "next/link";
import Error from "next/error";
import { useSession } from "next-auth/react";

import { Divider } from "#/components/uiParts/Divider";
import { Hamburger, Nav, SignInModal } from "#/components/pages/home";
import { useGetProfile } from "#/hooks/useGetProfile";
import silhouetteAvatar from "/public/silhouette-avatar.png";
import sample17 from "/public/sample17.png";
import sample16 from "/public/sample16.png";
import sample14 from "/public/sample14.png";
import sample12 from "/public/sample12.png";
import sample13 from "/public/sample13.png";
import UndrawMovieNight from "/public/undraw_movie_night_re_9umk.svg";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: profile, isLoading, isError, error } = useGetProfile(session);
  const queryClient = useQueryClient();

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
      <header className="group/header fixed top-0 inset-x-0 z-10 h-14 bg-base-white/50 backdrop-blur-sm [&:has(#hamburger:checked)]:bg-base-white dark:[&:has(#hamburger:checked)]:bg-base-black dark:bg-base-black/50 dark:text-base-white font-medium transition">
        <div className="h-[55px] pt-0.5 max-w-5xl mx-auto flex items-center px-4">
          {/* タイトル */}
          <h1 className="text-xl font-bold">
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

        <Divider classWrapper="px-2" />
      </header>

      <main className="mt-14 max-w-5xl mx-auto">
        <section className="flex flex-col items-center">
          <div className="mt-28 flex flex-col items-center justify-center gap-y-14">
            <h1 className="text-6xl font-black">好きな動画を共有</h1>
            <p className="text-lg">
              好きな YouTube 動画を集めた、あなただけのページを作成し、SNS
              で公開しよう
            </p>

            {sessionStatus === "loading" ? null : sessionStatus ===
              "unauthenticated" ? (
              <button
                onClick={() => queryClient.setQueryData(["signInModal"], true)}
                className="py-2 px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-blue-500 animate-appearance hover:opacity-80 text-xl"
              >
                Login
              </button>
            ) : (
              <Link
                href="/my/dashboard"
                className="py-2 px-4 rounded-md bg-base-black text-base-white dark:bg-base-white dark:text-base-black outline-none focus-visible:ring-2 ring-blue-500 animate-appearance hover:opacity-80"
              >
                ページを作成
              </Link>
            )}
          </div>
          <div className="mt-20">
            <UndrawMovieNight />
          </div>
        </section>

        <Divider classWrapper="w-full" />

        <section className="mt-28 w-full space-y-20">
          <div className="grid grid-cols-12">
            <div className="col-span-5 grid place-content-center">
              <h2 className="text-4xl font-black text-center leading-relaxed">
                カテゴリーを作成し
                <br />
                動画を登録
              </h2>
            </div>
            <Image src={sample14} alt="sample" className="col-span-7" />
          </div>

          <div className="grid grid-cols-12">
            <Image src={sample17} alt="sample" className="col-span-7" />
            <div className="col-span-5 grid place-content-center">
              <h2 className="text-4xl font-black text-center leading-relaxed">
                カテゴリーは５つまで
                <br />
                作成可能
              </h2>
              <p className="mt-5 text-center text-stone-500 dark:text-stone-200">
                動画はカテゴリーごとに６つまで登録可能
              </p>
            </div>
          </div>

          <div className="w-full grid grid-cols-12">
            <div className="col-span-5 grid place-content-center">
              <h2 className="text-4xl font-black text-center leading-relaxed">
                気になった動画を
                <br />
                その場で再生
              </h2>
            </div>
            <Image
              src={sample16}
              alt="sample"
              className="col-span-7 rounded-3xl"
            />
          </div>
        </section>

        {/* カスタマイズ */}
        <section className="mt-36 w-full flex flex-col items-center">
          <h2 className="text-4xl font-black">カスタマイズ</h2>
          <p className="mt-5 text-center text-stone-500 dark:text-stone-200">
            背景を自由に設定することができます。
            <br />
            背景に合わせてライトモード、ダークモードを選択できます。
          </p>
          <div className="mt-14 w-full flex justify-center gap-x-16">
            <Image
              src={sample12}
              alt="sample"
              className="rounded-xl max-w-xs"
            />
            <Image
              src={sample13}
              alt="sample"
              className="rounded-xl max-w-xs"
            />
          </div>
        </section>
      </main>

      <footer className="mt-28 h-20">
        <div className="max-w-5xl mx-auto h-full px-4">
          <Divider classWrapper="" />
          <div className="h-[79px] flex justify-between items-center">
            <div className="flex space-x-4">
              <p>利用規約</p>
              <p>プライバシーポリシー</p>
              <p>お問い合わせ</p>
            </div>
            <p>Copyright &copy; 2023 Favolink. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <SignInModal />
    </>
  );
}
