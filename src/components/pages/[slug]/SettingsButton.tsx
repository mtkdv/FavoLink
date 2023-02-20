import Link from "next/link";
import Error from "next/error";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import { FaUserCog } from "react-icons/fa";
import { PublicPageData } from "#/pages/api/[slug]";

export const SettingsButton = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError, error } = useQuery<
    unknown,
    {
      code: string;
      message: string;
    },
    PublicPageData
  >(["public"], {
    enabled: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <Error statusCode={404} title={error.message} />;
  }

  const { profile, custom } = data;

  return (
    <>
      {session?.user && session.user.id === profile.userId && (
        <Link
          href="/my/profile"
          className={clsx(
            "absolute group top-3 right-6 p-3 border border-white rounded-full shadow-[0_2px_8px_-2px] shadow-black/30 hover:shadow-lg backdrop-blur-sm transition outline-none focus-visible:ring-2",
            custom.mode === "LIGHT"
              ? "bg-white/20 hover:bg-white/40"
              : "bg-black/20 hover:bg-white"
          )}
        >
          <FaUserCog
            size={24}
            className={clsx(
              "translate-x-0.5 transition",
              custom.mode === "LIGHT"
                ? "text-stone-500 group-hover:text-base-black"
                : "text-white group-hover:text-base-black"
            )}
          />
        </Link>
      )}
    </>
  );
};
