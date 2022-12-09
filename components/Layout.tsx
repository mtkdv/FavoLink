import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="fixed inset-y-0 z-10 w-60 border-r border-gray-800">
        <div>
          <h1>Favolink</h1>
        </div>
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
            <li>
              <Link href={`/my/link`}>お気に入りのリンク追加</Link>
            </li>
            <li>
              <Link href={`/my/preview`}>プレビュー</Link>
            </li>
            {session ? (
              <li>
                <button
                  className="bg-white active:bg-gray-100 text-gray-800 pl-1 pr-4 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => signOut()}
                >
                  ログアウト
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      <div className="pl-60">{children}</div>
    </>
  );
};
