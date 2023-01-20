import Image from "next/image";
import Link from "next/link";
import avatar2 from "#/public/avatar2.png";
import Router from "next/router";
import { useGetProfile } from "#/lib/useGetProfile";
import { CategorizedLink } from "#/components/CategorizedLink";
import { useSession } from "next-auth/react";
import { useGetLinks } from "#/lib/useGetLinks";
import { useGetCategories } from "#/lib/useGetCategories";

const Preview = () => {
  const { data: session } = useSession();

  const { data: profile } = useGetProfile(session);
  const { data: links } = useGetLinks(session);
  const { data: categories } = useGetCategories(session);

  return (
    <div>
      <header className="">
        <ul>
          <li>
            <button onClick={() => Router.back()}>戻る</button>
          </li>
          <li>
            <p>プレビューモード</p>
          </li>
          <li>
            {/* FIXME: */}
            {profile && profile.slug ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/${profile.slug}`}
              >
                公開URLはこちら
              </a>
            ) : (
              <Link href="/my/profile">公開URLの設定はこちら</Link>
            )}
          </li>
        </ul>
      </header>

      <main>
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 p-6">
          <div className="absolute -top-[5%] -left-40 bg-gradient-to-tr from-white/40 to-white/10 rounded-full w-[450px] h-[450px] animate-[animate_7s_infinite]"></div>
          <div className="absolute top-[30%] -right-40 bg-gradient-to-bl from-white/40 to-white/0 rounded-full w-[550px] h-[550px] animate-[animate_10s_infinite]"></div>
          <div className="absolute bottom-[3%] left-10 bg-gradient-to-br from-white/40 to-white/0 rounded-full w-[400px] h-[400px] animate-[animate_6s_infinite]"></div>

          {/* Glass */}
          {/* ? なぜ横幅いっぱい？ */}
          <div className="relative z-10 max-w-3xl mx-auto bg-gradient-to-br from-white/50 to-white/20 rounded-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)] mt-12">
            {session && profile ? (
              <div className="absolute z-20 top-0 -translate-y-10 left-1/2 -translate-x-1/2 space-y-4">
                <div className="flex justify-center">
                  <Image
                    src={profile.image ?? avatar2}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  ></Image>
                </div>
                <p className="text-center font-extrabold">{profile.name}</p>
                {/* <p className="whitespace-pre-wrap">{profile.description}</p> */}
              </div>
            ) : null}
            <div className="mt-20">
              <CategorizedLink categories={categories} links={links} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
