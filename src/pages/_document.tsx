import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja" className="font-custom">
      <Head />
      <body className="bg-base-white text-base-black dark:bg-base-black dark:text-base-white selection:bg-accent selection:text-white animate-appearance">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
