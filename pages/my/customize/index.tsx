import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement } from "react";

const Customize: NextPageWithLayout = () => {
  return (
    <>
      <div className="w-2 h-[3000px] bg-gradient-to-b from-rose-400 to-blue-400"></div>
    </>
  );
};

Customize.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Customize;
