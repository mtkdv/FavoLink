import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaUserCog } from "react-icons/fa";

import { pagesInfo, queryKeys } from "#/const";
import { PublicResources } from "#/types";

export const SettingsButton = () => {
  const { data: session } = useSession();
  const { data } = useQuery<Omit<PublicResources, "videos">>(
    queryKeys.publicResources,
    { enabled: false }
  );

  return session?.user && session.user.id === data?.profile.userId ? (
    <Link
      href={pagesInfo.my.profile.href}
      className={clsx(
        "group absolute right-6 top-3 rounded-full border border-white p-3 shadow-[0_2px_8px_-2px] shadow-black/30 outline-none ring-juniper-500 backdrop-blur-sm transition hover:shadow-lg focus-visible:ring-2",
        data.custom.mode === "LIGHT"
          ? "bg-white/20 hover:bg-white/40"
          : "bg-black/20 hover:bg-white"
      )}
    >
      <FaUserCog
        size={24}
        className={clsx(
          "translate-x-0.5 transition",
          data.custom.mode === "LIGHT"
            ? "text-stone-500 group-hover:text-base-black"
            : "text-white group-hover:text-base-black"
        )}
      />
    </Link>
  ) : null;
};
