import { NextPageWithLayout } from "#/pages/_app";
import Layout from "#/components/Layout";
import { ReactElement } from "react";

const Profile: NextPageWithLayout = () => {
  return <div>Profile</div>;
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
