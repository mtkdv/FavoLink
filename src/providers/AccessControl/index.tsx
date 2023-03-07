import { PagesPath } from "#/const";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const AccessControl = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();

  if (/^\/my\/.+/.test(router.asPath)) {
    switch (status) {
      case "loading": {
        return null;
      }

      case "unauthenticated": {
        return <Redirect type="replace" destination="/" />;
      }
    }
  }

  // FIXME: Dashboardページを一時的に無効化。
  if (/^\/my\/dashboard$/.test(router.asPath)) {
    // return <Redirect type="back" />;
    return <Redirect type="replace" destination="/" />;
  }

  return <>{children}</>;
};

type RedirectBaseOptions =
  | { type: "replace" | "push"; destination: PagesPath }
  | { type: "back" };

const Redirect = (opts: RedirectBaseOptions) => {
  const router = useRouter();
  if (opts.type === "back") {
    router.back();
  } else {
    router[opts.type](opts.destination);
  }

  return null;
};
