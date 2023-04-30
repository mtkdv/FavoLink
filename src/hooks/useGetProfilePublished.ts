import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks";

type ProfilePublished = Pick<Profile, "published">;

export const useGetProfilePublished = () => {
  const userId = useUserId();

  return useQuery<ProfilePublished, AxiosError>({
    queryKey: queryKeys.getProfilePublished,
    queryFn: async () => {
      const res = await axios.get<ProfilePublished>(
        `/api/users/${userId}/profile/_published`
      );

      return res.data;
    },
    enabled: !!userId,
    useErrorBoundary: true,
  });
};
