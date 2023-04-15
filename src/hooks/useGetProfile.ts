import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks";

export const useGetProfile = () => {
  const userId = useUserId();

  return useQuery<Profile, AxiosError>({
    queryKey: queryKeys.getProfile,
    queryFn: async () => {
      const res = await axios.get<Profile>(`/api/users/${userId}/profile`);

      await new Promise((r) => setTimeout(r, 1000));

      return res.data;
    },
    enabled: !!userId,
    useErrorBoundary: true,
  });
};
