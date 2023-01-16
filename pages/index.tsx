import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import avatar2 from "#/public/avatar2.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGetProfile } from "#/lib/useGetProfile";
import React, { useEffect, useState } from "react";
import { SignInModal } from "../components/SignInModal";

export default function Home() {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      console.log("light mode");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      console.log("dark mode");
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 mx-auto flex justify-between py-4 lg:max-w-5xl">
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
              <button type="button" onClick={toggleDarkMode}>
                テーマ切り替え
              </button>
            </li>
            <li>
              {session && profile && !profile.hasOwnProperty("message") ? (
                // <button onClick={(e) => handleSignOut(e)}>Sign out</button>
                <button onClick={() => signOut()}>Sign out</button>
              ) : (
                // <button onClick={(e) => handleSignIn(e)}>Sign in</button>
                // <button onClick={() => signIn()}>Sign in</button>
                <button onClick={() => setIsOpen(true)}>Sign in</button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* <h1 className="text-white text-7xl">Lorem ipsum dolor sit.</h1>
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
        <h1 className="text-white mt-14 text-7xl">Lorem ipsum dolor sit.</h1> */}
      </main>
      <footer></footer>
      <SignInModal {...{ isOpen, setIsOpen }} />
    </>
  );
}
