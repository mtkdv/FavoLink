import { User } from "#/store/store";
import { useQuery } from "@tanstack/react-query";

type Profile = {
  name?: string;
  image?: string;
  slug?: string;
  description?: string;
  published?: boolean;
};

export const useGetProfile = (user: User) => {
  const links = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${user.uid}`);
      // return (await res.json()) as Profile;
      return await res.json();
    },
    enabled: !!user,
  });
  return links;
};
