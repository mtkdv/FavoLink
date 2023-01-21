import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-screen text-base-white bg-base-black">
      <div className="fixed inset-y-0 w-60 z-10">
        <nav>
          <ul>
            <li>
              <Link href={`/`}>トップページ</Link>
            </li>
            <li>
              <Link href={`/my/dashboard`}>ダッシュボード</Link>
            </li>
            <li>
              <Link href={`/my/profile`}>プロフィール編集</Link>
            </li>
            {/* <li>
              <Link href={`/my/link`}>お気に入りのリンク追加</Link>
            </li> */}
            <li>
              <Link href={`/my/like_url`}>お気に入りの動画追加</Link>
            </li>
            <li>
              <Link href={`/my/preview`}>プレビュー</Link>
            </li>
            {session ? (
              <li>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className=""
                >
                  ログアウト
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      <div className="pl-60">{children}</div>
    </div>
  );
};
