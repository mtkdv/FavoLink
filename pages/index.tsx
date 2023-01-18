import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import avatar2 from "#/public/avatar2.png";
import { signOut, useSession } from "next-auth/react";
import { useGetProfile } from "#/lib/useGetProfile";
import React, { useState } from "react";
import { SignInModal } from "../components/SignInModal";

const MENUS = [
  {
    title: "Dashboard",
    href: "/my/dashboard",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 h-20 bg-base-white border-b border-b-base-black/10">
        <div className="max-w-3xl mx-auto px-8 h-full flex items-center">
          <div>
            <Link
              href={`/`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <h1 className="text-3xl font-bold">FavoLink</h1>
            </Link>
          </div>
          <span className="flex-1"></span>

          {/* メニュー */}
          <nav
            className={clsx(
              "absolute bg-base-white top-20 right-0 h-[calc(100vh_-_80px)] transition-all duration-300",
              "md:static md:opacity-100 md:h-min",
              !isMenuOpen && "left-full opacity-0",
              isMenuOpen && "left-0 opacity-100"
            )}
          >
            <ul className="flex flex-col mt-12 px-8 md:flex-row md:mt-0 md:px-0 md:space-x-4">
              {/* Menus */}
              {MENUS.map(({ title, href }) => (
                <li className="flex items-center border-b border-b-slate-700/10 transition-all md:border-b-0">
                  <Link
                    href={href}
                    className="py-4 px-2 w-full max-md:hover:bg-slate-200/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <span className="group md:relative">
                      <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                      <span>{title}</span>
                    </span>
                  </Link>
                </li>
              ))}

              {/* Login Menus */}
              <li className="flex items-center border-b border-b-slate-700/10 transition-all md:border-b-0">
                {session && profile && !profile.hasOwnProperty("message") ? (
                  <button
                    onClick={() => signOut()}
                    className="py-4 px-2 w-full max-md:hover:bg-slate-200/20 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <span className="group md:relative">
                      <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                      <span>Logout</span>
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="py-4 px-2 w-full max-md:hover:bg-slate-200/20 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <span className="group md:relative">
                      <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                      <span>Login</span>
                    </span>
                  </button>
                )}
              </li>
            </ul>
          </nav>

          {/* ハンバーガーメニュー */}
          <div className="md:hidden grid place-items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="relative flex items-center justify-center w-8 h-6">
                <span
                  className={clsx(
                    "absolute bg-base-black h-0.5 w-6 rounded-full shadow-md -translate-y-2 transition-transform duration-300",
                    isMenuOpen && "origin-center rotate-45 translate-y-0"
                  )}
                ></span>
                <span
                  className={clsx(
                    "absolute bg-base-black h-0.5 w-6 rounded-full shadow-md transition duration-300",
                    isMenuOpen && "bg-transparent -translate-x-full"
                  )}
                ></span>
                <span
                  className={clsx(
                    "absolute bg-base-black h-0.5 w-6 rounded-full shadow-md translate-y-2 transition-transform duration-300",
                    isMenuOpen && "origin-center -rotate-45 translate-y-0"
                  )}
                ></span>
              </span>
            </button>
          </div>

          {session && profile && !profile.hasOwnProperty("message") ? (
            <div className="ml-4">
              <Image
                src={profile.image ?? avatar2}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : null}
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
      <SignInModal {...{ isModalOpen, setIsModalOpen }} />
    </>
  );
}
