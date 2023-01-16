import "../styles/globals.css";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import { BsFillBadge4KFill } from "react-icons/bs";

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

  /** Dark Modeの適用 */
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              color: "#fff",
              backgroundColor: "#333",
            },
            success: {
              iconTheme: {
                primary: "teal",
                secondary: "#fff",
              },
              duration: 3000,
            },
          }}
        />
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
