import Image from "next/image";
import Link from "next/link";
import avatar2 from "#/public/avatar2.png";
import { useSession } from "next-auth/react";
import { useGetProfile } from "#/lib/useGetProfile";
import React, { useState } from "react";
import { HamburgerMenu } from "#/components/uiParts/HamburgerMenu";
import { Navbar } from "#/components/pages/home/Navbar";
import { SignInModal } from "#/components/pages/home/SignInModal";

export default function Home() {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 h-20 bg-base-white">
        <div className="max-w-3xl mx-auto px-8 h-full flex items-center border-b border-b-black/10">
          <div>
            <Link
              href={`/`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <h1 className="text-3xl font-bold">FavoLink</h1>
            </Link>
          </div>
          <span className="flex-1"></span>

          <Navbar {...{ isMenuOpen, setIsModalOpen }} />

          <HamburgerMenu {...{ isMenuOpen, setIsMenuOpen }} />

          {/* FIXME: useGetProfileのレスポンスを判別可能なユニオンにする。 */}
          {session && profile && !profile.hasOwnProperty("message") ? (
            <div className="ml-4 flex items-center space-x-6">
              <div className="w-px h-6 bg-base-black/10"></div>
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
