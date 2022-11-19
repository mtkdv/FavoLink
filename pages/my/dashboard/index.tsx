import { NextPageWithLayout } from "#/pages/_app";
import Layout from "#/components/Layout";
import { ReactElement } from "react";

const Dashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
