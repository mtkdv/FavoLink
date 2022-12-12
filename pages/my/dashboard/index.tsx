import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/Layout";
import { ReactElement } from "react";
import { useRouter } from "next/router";

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    await fetch(`/api/user`, {
      method: "DELETE",
    });

    router.replace("/");
  };

  return (
    <div>
      <p>Dashboard</p>
      <button onClick={handleDeleteAccount}>アカウント削除</button>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
