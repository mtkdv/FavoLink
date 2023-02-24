import { ReactElement } from "react";
import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";

const Dashboard: NextPageWithLayout = () => {
  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
