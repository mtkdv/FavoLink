import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja" className="font-custom">
      <Head />
      <body className="bg-base-white text-base-black selection:bg-accent selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
