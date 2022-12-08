import { User } from "#/store/store";
import { useQuery } from "@tanstack/react-query";

export type Profile = {
  name?: string;
  image?: string;
  slug?: string;
  description?: string;
  published?: boolean;
};

export const useGetProfile = <T>(user: User) => {
  const links = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${user.uid}`);
      // return (await res.json()) as Profile;
      return (await res.json()) as T;
    },
    enabled: !!user,
  });
  return links;
};
