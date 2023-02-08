import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement } from "react";

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="w-80 h-80 bg-slate-200">
      <div className="h-20 bg-red-300">Dashboard</div>
      <div className="h-20 bg-blue-300 mt-10">Hoge</div>
      {/* <div className="w-40 h-40 bg-blue-300">Customize</div> */}
      {/* <div className="h-[100px] w-[150px]">Profile</div>
      <div className="h-[100px] w-[200px]">Width</div> */}
    </div>
  );
};

// Dashboard.getLayout = function getLayout(page: ReactElement) {
Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
