import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";

export const useGetProfile = (session: Session | null) => {
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get<Profile>(
        `/api/profiles/${session!.user!.id}`
      );
      return res.data;
    },
    enabled: !!session && !!session.user,
  });
  return profile;
};
