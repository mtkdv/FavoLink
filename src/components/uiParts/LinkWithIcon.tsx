import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import {
  RiDashboardFill,
  RiHomeSmileFill,
  RiMagicFill,
  RiUser5Fill,
} from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

const IconObj = {
  RiDashboardFill,
  RiHomeSmileFill,
  RiMagicFill,
  RiUser5Fill,
  IoLogoYoutube,
  FaEye,
};

export type IconKeys = keyof typeof IconObj;

type Props = {
  title: string;
  href: string;
  // icon: ReactNode;
  // icon: string;
  icon: IconKeys;
};

export const LinkWithIcon: FC<Props> = ({ title, href, icon }) => {
  const router = useRouter();

  const iconKeys = Object.keys(IconObj) as IconKeys[];
  const iconPropery = iconKeys.find((Icon) => Icon === icon)!;
  const Icon = IconObj[iconPropery];
  // const Icon = IconObj["RiMagicFill"]

  return (
    <Link
      href={href}
      className={clsx(
        "h-14 flex items-center rounded-md hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-offset-[3px] focus-visible:ring-accent max-md:flex-col max-md:justify-center max-md:space-y-1 md:h-12 md:space-x-2 md:px-3 transition-shadow",
        router.asPath === href && "bg-secondary"
      )}
    >
      {/* {icon} */}
      {Icon && <Icon />}
      <p className="text-sm max-md:text-xs">{title}</p>
    </Link>
  );
};
