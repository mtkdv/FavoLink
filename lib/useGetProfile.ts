import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

// export type Profile = {
//   name?: string;
//   image?: string;
//   slug?: string;
//   description?: string;
//   published?: boolean;
// };

// const { data: profile } = useGetProfile<Profile>(session);

// export const useGetProfile = <T>(session: Session | null) => {
export const useGetProfile = (session: Session | null) => {
  const links = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`/api/profile`);
      // return (await res.json()) as T;
      return (await res.json()) as Profile;
    },
    enabled: !!session,
  });
  return links;
};
