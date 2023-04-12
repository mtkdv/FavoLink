import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja" className="font-custom">
      <Head />
      <body className="animate-appearance bg-base-white text-base-black selection:bg-juniper-400 selection:text-white dark:bg-base-black dark:text-base-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
