import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja" className="font-custom">
      <Head />
      <body className="bg-base-white text-base-black dark:bg-base-black dark:text-base-white selection:bg-cocoa-200 selection:text-cocoa-700 animate-appearance">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
