import "#/styles/globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { kleeOne } from "#/lib/nextFont";
import { AccessControl, ErrorBoundary, Notification } from "#/providers";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppPropsWithSession & {
  Component: NextPageWithLayout;
};

type AppPropsWithSession = AppProps<{ session: Session | null }>;

const queryClient = new QueryClient();

// const MyApp: AppType<{ session: Session | null }> = ({
const MyApp = ({
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
            <main className={kleeOne.className}>
              {getLayout(<Component {...pageProps} />)}
            </main>
          </AccessControl>
        </ErrorBoundary>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
