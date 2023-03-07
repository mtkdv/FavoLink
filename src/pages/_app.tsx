import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

import "#/styles/globals.css";
import { ErrorBoundaries } from "#/components/shared";
import { Toast } from "#/components/pages/_app";
import { NextRouter, useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundaries>
          <Toast />
          <AccessControl>
            {getLayout(<Component {...pageProps} />)}
          </AccessControl>
        </ErrorBoundaries>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;

const AccessControl = ({ children }: { children: React.ReactNode }) => {
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
    return <Redirect type="back" />;
  }

  return <>{children}</>;
};

type Destination =
  | "/"
  | "/my/dashboard"
  | "/my/profile"
  | "/my/add-video"
  | "/my/customize"
  | "/my/preview";

type RedirectBaseOptions =
  | { type: "replace" | "push"; destination: Destination }
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
