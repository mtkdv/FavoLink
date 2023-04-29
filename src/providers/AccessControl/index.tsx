import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { PagesPath } from "#/const";

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

  // FIXME: Dashboard、Contactページを一時的に無効化。
  if (/^\/(my\/dashboard|contact)$/.test(router.asPath)) {
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router[opts.type](opts.destination);
  }

  return null;
};
