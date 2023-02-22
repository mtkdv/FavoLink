import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement } from "react";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      {/* <div className="px-10 h-[500px] border border-cyan-500 flex items-start">
        <div className="w-40 min-w-[120px] bg-violet-400 aspect-[2/3]"></div>
        <div className="w-40 min-w-[120px] bg-indigo-400 aspect-[2/3]"></div>
      </div> */}

      {/* <div className="mt-4 px-10 h-[800px] border border-cyan-500 flex flex-col items-start">
        <div className="h-90 min-h-[240px] bg-violet-400 aspect-[2/3]"></div>
        <div className="h-90  bg-indigo-400 aspect-[2/3]"></div>
      </div> */}

      {/* <div className="mt-4 px-10 h-[800px] border border-cyan-500 flex flex-col">
        <div className="flex">
          <span className="block w-60 min-w-[160px] bg-violet-400 aspect-[2/3]"></span>
        </div>
        <span className="block w-60  bg-indigo-400 aspect-[2/3]"></span>
      </div> */}

      {/* grid */}
      {/* <div className="mt-4 px-10 border border-cyan-500 grid grid-cols-1">
        <div className="flex">
          <div className="w-60 min-w-[160px] bg-violet-400 aspect-[2/3]"></div>
        </div>
        <div className="w-60 bg-indigo-400 aspect-[2/3]"></div>
      </div> */}

      {/* <div className="mt-4 px-10 border border-cyan-500 bg-lime-400 bg-clip-content flex justify-around flex-wrap">
        <div className="w-60 min-w-[160px] bg-violet-400 aspect-[2/3]"></div>
        <div className="w-60 bg-indigo-400 aspect-[2/3]"></div>
      </div> */}

      <div className="mt-4 px-10 border border-cyan-500 bg-lime-400 bg-clip-content">
        <div className="flex">
          <div className="w-60 min-w-[160px] bg-violet-400 aspect-[2/3]"></div>
        </div>
        <div className="w-60 bg-indigo-400 aspect-[2/3]"></div>
      </div>
    </>
  );
};

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
