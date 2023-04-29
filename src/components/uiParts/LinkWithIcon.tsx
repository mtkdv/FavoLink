import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import {
  RiHomeSmileFill,
  RiDashboardFill,
  RiUser5Fill,
  RiMagicFill,
} from "react-icons/ri";

import { pagesInfo } from "#/const";

const iconObj = {
  RiHomeSmileFill,
  RiDashboardFill,
  RiUser5Fill,
  IoLogoYoutube,
  RiMagicFill,
  FaEye,
};

export type IconKeys = keyof typeof iconObj;

type Props = {
  title: { en: string };
  href: string;
  icon: IconKeys;
};

export const LinkWithIcon = ({ title, href, icon }: Props) => {
  const router = useRouter();

  const iconKeys = Object.keys(iconObj) as IconKeys[];
  const iconKey = iconKeys.find((iconKey) => iconKey === icon);
  const Icon = iconKey ? iconObj[iconKey] : undefined;

  // FIXME: Dashboardページを一時的に無効化。
  if (title.en === "Dashboard") {
    return (
      <Link
        // href=""
        // href="javascript:void(0)"
        href={pagesInfo.my.dashboard.href}
        onClick={(e) => e.preventDefault()}
        tabIndex={-1}
        className={clsx(
          "flex h-14 items-center rounded-md outline-none ring-juniper-500 transition focus-visible:ring-2 max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3",
          "cursor-not-allowed text-stone-400"
        )}
      >
        <span className="text-xs">🚧</span>
        <p className="max-md:text-xs md:font-light md:tracking-wider">
          {title.en}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={clsx(
        "flex h-14 items-center rounded-md text-liver-500 outline-none ring-juniper-500 transition hover:bg-stone-300 focus-visible:ring-2 max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3",
        router.asPath === href && "bg-stone-200"
      )}
    >
      {Icon && <Icon />}
      <p className="max-md:text-xs md:font-light md:tracking-wider">
        {title.en}
      </p>
    </Link>
  );
};
