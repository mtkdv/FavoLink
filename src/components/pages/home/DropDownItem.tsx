import clsx from "clsx";
import Link from "next/link";
import { FaEye, FaGithub } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io5";
import { RiMagicFill, RiUser5Fill } from "react-icons/ri";

import { Item } from "#/const/menuList";
import { isExternal } from "#/utils";

const iconObj = {
  RiUser5Fill,
  IoLogoYoutube,
  RiMagicFill,
  FaEye,
  GrMail,
  // FaTwitter,
  FaGithub,
};

export type IconKeys = keyof typeof iconObj;

export const DropDownItem = ({
  item: { title, href, icon },
}: {
  item: Item;
}) => {
  const iconKeys = Object.keys(iconObj) as IconKeys[];
  const iconKey = iconKeys.find((iconKey) => iconKey === icon);
  const Icon = iconKey ? iconObj[iconKey] : undefined;

  // FIXME: /contactが未実装の間。
  if (title.en === "Contact") {
    return (
      <li key={href} className="group/item h-10 w-32 rounded-lg">
        <Link
          href={href}
          onClick={(e) => e.preventDefault()}
          tabIndex={-1}
          className="flex h-full w-full cursor-not-allowed items-center space-x-2 px-5 text-stone-400"
        >
          <span className="text-sm">🚧</span>
          <span className="font-light tracking-wider">{title.en}</span>
        </Link>
      </li>
    );
  }

  return (
    <li key={href} className="group/item h-10 w-40">
      {/* {/^http[s]?:\/\/.+/.test(href) ? ( */}
      {isExternal(href) ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          className="flex h-full w-full items-center space-x-2 px-5 outline-none ring-inset ring-juniper-500 transition focus-visible:ring-2"
        >
          {Icon && (
            <Icon className="scale-0 opacity-0 transition duration-300 group-hover/item:scale-100 group-hover/item:opacity-100" />
          )}
          <span
            className={clsx(
              "font-light tracking-wider transition duration-300",
              Icon
                ? "-translate-x-6 group-hover/item:translate-x-0"
                : "group-hover/item:translate-x-1"
            )}
          >
            {title.en}
          </span>
        </a>
      ) : (
        <Link
          href={href}
          className="flex h-full w-full items-center space-x-2 px-5 outline-none ring-inset ring-juniper-500 transition focus-visible:ring-2"
        >
          {Icon && (
            <Icon className="scale-0 opacity-0 transition duration-300 group-hover/item:scale-100 group-hover/item:opacity-100" />
          )}
          <span
            className={clsx(
              "font-light tracking-wider transition duration-300",
              Icon
                ? "-translate-x-6 group-hover/item:translate-x-0"
                : "group-hover/item:translate-x-1"
            )}
          >
            {title.en}
          </span>
        </Link>
      )}
    </li>
  );
};
