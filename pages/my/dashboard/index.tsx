import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement } from "react";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <p className="border">Dashboard</p>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
