import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "#/styles/globals.css";
import { AccessControl, ErrorBoundary, Notification } from "#/providers";

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
        <ErrorBoundary>
          <Notification />
          <AccessControl>
            {getLayout(<Component {...pageProps} />)}
          </AccessControl>
        </ErrorBoundary>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
