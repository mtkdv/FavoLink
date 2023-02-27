import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";

const MENU_LIST = [
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

export const NavbarDefault = ({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { status: sessionStatus } = useSession();

  return (
    <nav
      // FIXME: max-mdにブラウザ幅を縮めたとき、opacity-0にtransitionが掛からない。
      // TODO: leftをtranslateに置き換える。パフォーマンスのため。
      className={clsx(
        "max-md:absolute top-[81px] inset-x-0 max-md:translate-x-full max-md:h-[calc(100vh_-_81px)] max-md:bg-base-white max-md:opacity-0 group-[:has(#hamburger:checked)]/header:translate-x-0 group-[:has(#hamburger:checked)]/header:opacity-100 transition duration-300",
        "md:ml-6 md:flex-1 md:animate-appearance"
      )}
    >
      <ul className="flex max-md:flex-col max-md:mt-12 max-md:px-8">
        {/* Menu list */}
        {MENU_LIST.map(({ title, href }) => (
          <li
            key={title}
            className="md:ml-4 flex items-center border-b border-b-black/10 transition-all md:border-b-0"
          >
            <Link
              href={href}
              className="py-4 px-2 w-full max-md:hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="group md:relative">
                <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                <span>{title}</span>
              </span>
            </Link>
          </li>
        ))}

        {/* Login menu */}
        <li className="md:ml-auto flex items-center border-b border-b-black/10 transition-all md:border-b-0">
          {sessionStatus === "loading" ? null : sessionStatus ===
            "unauthenticated" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-4 px-2 w-full max-md:hover:bg-black/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 animate-appearance"
            >
              <span className="group md:relative">
                <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                <span>Login</span>
              </span>
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="py-4 px-2 w-full max-md:hover:bg-black/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 animate-appearance"
            >
              <span className="group md:relative">
                <span className="md:absolute md:bg-gradient-to-r md:from-red-200 md:via-red-300 md:to-yellow-200 md:w-full md:h-0.5 md:-bottom-2 md:transition-transform md:duration-300 md:scale-x-0 md:origin-right md:group-hover:origin-left md:group-hover:scale-x-100"></span>
                <span>Logout</span>
              </span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
