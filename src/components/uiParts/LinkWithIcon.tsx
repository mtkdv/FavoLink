import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  RiHomeSmileFill,
  RiDashboardFill,
  RiUser5Fill,
  RiMagicFill,
} from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

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
  title: string;
  href: string;
  icon: IconKeys;
};

export const LinkWithIcon = ({ title, href, icon }: Props) => {
  const router = useRouter();

  const iconKeys = Object.keys(iconObj) as IconKeys[];
  const iconKey = iconKeys.find((iconKey) => iconKey === icon);
  const Icon = iconKey ? iconObj[iconKey] : undefined;

  // FIXME: Dashboardページを一時的に無効化。
  if (title === "Dashboard") {
    return (
      <Link
        // href=""
        // href="javascript:void(0)"
        href={pagesInfo.my.dashboard.href}
        onClick={(e) => e.preventDefault()}
        tabIndex={-1}
        className={clsx(
          "h-14 flex items-center rounded-md outline-none focus-visible:ring-2 ring-cocoa-400 max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3 transition",
          "cursor-not-allowed text-stone-400"
        )}
      >
        <span className="text-xs">🚧</span>
        <p className="text-xs md:text-sm md:font-semibold md:tracking-wide">
          {title}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={clsx(
        "h-14 flex items-center rounded-md hover:bg-cocoa-200 hover:text-cocoa-700 outline-none focus-visible:ring-2 ring-cocoa-400 max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3 transition",
        router.asPath === href && "bg-cocoa-200 text-cocoa-700"
      )}
    >
      {/* {icon} */}
      {Icon && <Icon />}
      <p className="text-xs md:text-sm md:font-semibold md:tracking-wide">
        {title}
      </p>
    </Link>
  );
};
