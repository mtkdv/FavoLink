import { userState } from "#/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import avatar2 from "#/public/avatar2.png";
import { useRouter } from "next/router";
import { Profile, useGetProfile } from "#/lib/useGetProfile";
import { CategorizedLink } from "#/components/CategorizedLink";

const Preview = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const { data: profile } = useGetProfile<Profile>(user);

  const handleButtonBack = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div>
      <header>
        <ul>
          <li>
            <button onClick={(e) => handleButtonBack(e)}>戻る</button>
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
            {profile ? (
              <>
                <Image
                  src={profile.image ?? avatar2}
                  alt="avatar"
                  width={40}
                  height={40}
                ></Image>
                <p>{profile.name}</p>
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
