import "#/styles/globals.css";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";

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
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
