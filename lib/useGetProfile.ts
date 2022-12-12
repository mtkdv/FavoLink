import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

// export const useGetProfile = <T>(session: Session | null) => {
export const useGetProfile = (session: Session | null) => {
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`/api/profile`);
      // return (await res.json()) as T;
      return (await res.json()) as Profile;
    },
    enabled: !!session,
  });
  return profile;
};
