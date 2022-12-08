import { User } from "#/store/store";
import { useQuery } from "@tanstack/react-query";

type Link = {
  title: string;
  url: string;
  thumbnailUrl: string;
  categoryId: string;
};

export const useGetLinks = (user: User) => {
  const links = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      // const res = await axios.get(`/api/link/${user.uid}`);
      // return res.data;
      const res = await fetch(`/api/link/${user.uid}`);
      return (await res.json()) as Link[];
    },
    enabled: !!user,
  });
  return links;
};
