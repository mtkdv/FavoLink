import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Profile } from "@prisma/client";

import { queryKeys } from "#/const";

export const useGetProfile = () => {
  const { data: session } = useSession();

  return useQuery<Profile, AxiosError>({
    queryKey: queryKeys.getProfile,
    queryFn: async () => {
      const res = await axios.get<Profile>(
        `/api/users/${session!.user!.id}/profile`
      );

      // Loading Test
      await new Promise((r) => setTimeout(r, 1000));

      return res.data;
    },
    enabled: !!session && !!session.user,
    useErrorBoundary: true,
  });
};
