import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
              <Link href={`/my/favolink`}>お気に入りのリンク追加</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="pl-60">{children}</div>
    </>
  );
};

export default Layout;
