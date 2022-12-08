import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { RecoilRoot } from "recoil";
import { Auth } from "#/components/Auth";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

// export default function MyApp({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppPropsWithLayout) {
//   // Use the layout defined at the page level, if available
//   const getLayout = Component.getLayout ?? ((page) => page);

//   return (
//     <SessionProvider session={session}>
//       <QueryClientProvider client={queryClient}>
//         <RecoilRoot>
//           <Auth />
//           {getLayout(<Component {...pageProps} />)}
//         </RecoilRoot>
//       </QueryClientProvider>
//     </SessionProvider>
//   );
// }

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Auth />
          {getLayout(<Component {...pageProps} />)}
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
