import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement } from "react";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <p className="bg-primary rounded-lg p-3 shadow-[2px_2px_2px_#EEE6E2]">
        Dashboard
      </p>
      <div className="flex flex-col space-y-3">
        <button className="border-4 border-red-400 outline outline-4 outline-emerald-300 focus:outline-dashed focus-visible:outline-dotted">
          outline
        </button>
        <button className="border-4 border-red-400 focus:outline-none focus-visible:outline focus-visible:outline-1">
          outline
        </button>
      </div>
      <div className="border-t-2 mt-3 flex flex-col space-y-3 py-3">
        <input
          type="text"
          className="border-4 border-black outline outline-4 outline-red-400 focus-visible:outline-dotted focus:outline-dashed"
          // className="border-4 border-black focus-visible:outline-dotted focus:outline-dashed"
        />
        <input type="text" className="focus:outline-none" />
        <input type="text" className="outline-none" />
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
