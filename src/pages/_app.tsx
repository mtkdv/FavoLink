import "#/styles/globals.css";
import React, { ReactElement, ReactNode, Suspense } from "react";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import {
  QueryClientProvider,
  QueryClient,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import ErrorBoundaryClass from "#/components/shared/ErrorBoudary";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaries, ErrorFallback } from "#/components/shared";
import { handleError } from "#/utils/handleError";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
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
        <Toaster
          position="bottom-right"
          // position="top-right"
          toastOptions={{
            style: {
              backgroundColor: "#333",
              color: "#fff",
            },
            // className:
            //   "bg-accent text-white ring-2 ring-offset-[3px] ring-accent",
            success: {
              iconTheme: {
                primary: "teal",
                secondary: "#fff",
              },
              duration: 5000,
            },
          }}
        />

        <ErrorBoundaries>
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundaries>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
