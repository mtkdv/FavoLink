import Link from "next/link";
import { RiMagicFill, RiUser5Fill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { FaTwitter, FaGithub } from "react-icons/fa";

import { Item } from "#/const/menuList";
import clsx from "clsx";
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

  // FIXME: /contactが未実装の間、以下をレンダリング。
  if (title === "Contact") {
    return (
      <li
        key={href}
        className="h-10 w-32 rounded-lg hover:bg-base-black/5 transition duration-300 group/item"
      >
        <Link
          href={href}
          onClick={(e) => e.preventDefault()}
          tabIndex={-1}
          className="px-3 flex w-full h-full items-center space-x-2 cursor-not-allowed text-stone-400"
        >
          <span className="text-sm">🚧</span>
          <span className="text-sm transition duration-300">{title}</span>
        </Link>
      </li>
    );
  }

  return (
    <li
      key={href}
      className="h-10 w-32 rounded-lg hover:bg-base-black/5 transition duration-300 group/item"
    >
      {/* {/^http[s]?:\/\/.+/.test(href) ? ( */}
      {isExternal(href) ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          className="px-3 flex w-full h-full items-center space-x-2"
        >
          {Icon && (
            <Icon className="opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 transition duration-300" />
          )}
          <span
            className={clsx(
              "text-sm transition duration-300",
              Icon
                ? "-translate-x-6 group-hover/item:translate-x-0"
                : "group-hover/item:translate-x-1"
            )}
          >
            {title}
          </span>
        </a>
      ) : (
        <Link
          href={href}
          className="px-3 flex w-full h-full items-center space-x-2"
        >
          {Icon && (
            <Icon className="opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 transition duration-300" />
          )}
          <span
            className={clsx(
              "text-sm transition duration-300",
              Icon
                ? "-translate-x-6 group-hover/item:translate-x-0"
                : "group-hover/item:translate-x-1"
            )}
          >
            {title}
          </span>
        </Link>
      )}
    </li>
  );
};
