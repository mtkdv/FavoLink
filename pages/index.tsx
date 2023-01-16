import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import avatar2 from "#/public/avatar2.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGetProfile } from "#/lib/useGetProfile";
import { toast } from "react-hot-toast";
import React, { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);

  // const handleSignIn = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   toast.promise(signIn("google"), {
  //     loading: "Loading",
  //     success: () => "サインインしました",
  //     error: () => `サインインに失敗しました`,
  //   });
  // };

  // const handleSignOut = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   await signOut();
  //   toast("サインアウトしました");

  // toast.promise(signOut(), {
  //   loading: "Loading",
  //   success: () => "サインアウトしました",
  //   error: () => `サインアウトに失敗しました`,
  // });
  // };

  // useEffect(() => {
  //   session
  //     ? toast.success("サインインしました")
  //     : toast.success("サインアウトしました");
  // }, [session]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 bg-black/50 z-10 backdrop-blur-sm flex justify-between py-2 px-4"
          // isVisible && "border-b border-white"
        )}
      >
        <div>
          <Link href={`/`}>
            <h1 className="text-3xl">Favolink</h1>
          </Link>{" "}
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-3 items-center">
            {session && profile && !profile.hasOwnProperty("message") ? (
              <li className="flex gap-1 items-center">
                <Image
                  src={profile.image ?? avatar2}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p>{profile.name}</p>
              </li>
            ) : null}
            <li>
              <Link href="my/dashboard">ダッシュボード</Link>
            </li>
            <li>
              <Link href="/about">当サイトについて</Link>
            </li>
            <li>
              {session && profile && !profile.hasOwnProperty("message") ? (
                // <button onClick={(e) => handleSignOut(e)}>Sign out</button>
                <button onClick={() => signOut()}>Sign out</button>
              ) : (
                // <button onClick={(e) => handleSignIn(e)}>Sign in</button>
                <button onClick={() => signIn()}>Sign in</button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1 className="text-white text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1>
      </main>
      <footer></footer>
    </>
  );
}
