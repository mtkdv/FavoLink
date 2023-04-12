import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";

type JsonUser = {
  id: number;
  name: string;
  email: string;
};

const Dashboard: NextPageWithLayout = () => {
  const { data, isLoading } = useQuery<JsonUser[]>({
    queryKey: ["GetUsers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      // await new Promise((r) => setTimeout(r, 5000));
      return data;
    },
    // suspense: true,
    useErrorBoundary: true,
  });

  if (isLoading) {
    return (
      <div className="absolute flex h-full w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="animate-appearance">
      <p>dashboard</p>
      <ul className="mt-10 space-y-2">
        {data?.map((user) => (
          <li key={user.id} className="grid grid-cols-12 rounded border">
            <p className="col-span-1 pl-2">{user.id}</p>
            <p className="col-span-5 border-l pl-2">{user.name}</p>
            <p className="col-span-6 border-l pl-2">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Dashboard.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
