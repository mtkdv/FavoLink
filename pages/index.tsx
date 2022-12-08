import { Profile, useGetProfile } from "#/lib/useGetProfile";
import { userState } from "#/store/store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import avatar2 from "#/public/avatar2.png";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const user = useRecoilValue(userState);
  const { data: profile } = useGetProfile<Profile>(user);
  const { data: session } = useSession();

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
          <ul className="flex space-x-3">
            {user ? (
              <>
                <li>{profile?.name}</li>
                <li>
                  <Image
                    src={profile?.image ?? avatar2}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </li>
              </>
            ) : null}
            <li>
              <Link href="my/dashboard">ダッシュボード</Link>
            </li>
            <li>
              <Link href="/about">当サイトについて</Link>
            </li>
            {/* {!user && (
              <li>
                <Link href="/signin">ログイン</Link>
              </li>
            )} */}
            {session ? (
              <>
                Signed in as {session.user?.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
              </>
            )}
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
