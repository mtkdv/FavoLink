import Image from "next/image";
import Link from "next/link";
import avatar2 from "#/public/avatar2.png";
import Router from "next/router";
import { useGetProfile } from "#/lib/useGetProfile";
import { CategorizedLink } from "#/components/CategorizedLink";
import { useSession } from "next-auth/react";

const Preview = () => {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);

  return (
    <div>
      <header>
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
        <div>
          <section>
            {session && profile ? (
              <>
                <Image
                  src={session.user?.image ?? avatar2}
                  alt="avatar"
                  width={40}
                  height={40}
                ></Image>
                <p>{session.user?.name}</p>
                <p>{profile.description}</p>
              </>
            ) : null}
          </section>
          <CategorizedLink />
        </div>
      </main>
    </div>
  );
};

export default Preview;
