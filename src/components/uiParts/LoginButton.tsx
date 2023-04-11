import { useQueryClient } from "@tanstack/react-query";

import { queryKeys, topInfo } from "#/const";
import clsx from "clsx";

export const LoginButton = ({ size }: { size: keyof typeof sizes }) => {
  const queryClient = useQueryClient();

  const sizes = {
    sm: {
      button: "px-3.5 py-1.5",
      font: "tracking-wider",
    },
    md: {
      button: "px-8 h-12",
      font: "text-lg tracking-widest",
    },
    full: {
      button: "w-full h-12",
      font: "text-lg tracking-widest",
    },
  };

  return (
    <button
      onClick={() => queryClient.setQueryData(queryKeys.signInModal, true)}
      className={clsx(
        sizes[size].button,
        "relative group bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-600 outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-1 animate-appearance transition"
      )}
    >
      <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-neutral-700 opacity-0 transition duration-500 group-hover:opacity-100" />
      <span className={clsx(sizes[size].font, "relative text-white")}>
        {topInfo.login}
      </span>
    </button>
  );
};
