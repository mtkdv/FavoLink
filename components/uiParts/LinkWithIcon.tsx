import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  href: string;
  icon: ReactNode;
};

export const LinkWithIcon: FC<Props> = ({ title, href, icon }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={clsx(
        "h-14 flex items-center rounded-md hover:bg-secondary",
        "outline-none focus-visible:ring-2 focus-visible:ring-offset-[3px] focus-visible:ring-accent",
        "max-md:flex-col max-md:justify-center max-md:space-y-1",
        "md:h-12 md:space-x-2 md:px-3",
        router.asPath === href && "bg-secondary"
      )}
    >
      {icon}
      <p className="text-sm max-md:text-xs">{title}</p>
    </Link>
  );
};
