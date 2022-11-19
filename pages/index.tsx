import clsx from "clsx";
import Link from "next/link";

export default function Home() {
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
            <li>
              <Link href="my/dashboard">ダッシュボード</Link>
            </li>
            <li>
              <Link href="/about">当サイトについて</Link>
            </li>
            <li>
              <Link href="/signin">ログイン</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1 className="text-white text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
        <h1 className="text-white mt-14 text-7xl">Dynamic without limits</h1>
      </main>
      <footer></footer>
    </>
  );
}
