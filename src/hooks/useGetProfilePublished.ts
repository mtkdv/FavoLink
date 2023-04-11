import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Profile } from "@prisma/client";

import { queryKeys } from "#/const";

type ProfilePublished = Pick<Profile, "published">;

export const useGetProfilePublished = () => {
  const { data: session } = useSession();

  return useQuery<ProfilePublished, AxiosError>({
    queryKey: queryKeys.getProfilePublished,
    queryFn: async () => {
      const res = await axios.get<ProfilePublished>(
        `/api/users/${session!.user!.id}/profile/_published`
      );

      return res.data;
    },
    enabled: !!session && !!session.user,
    useErrorBoundary: true,
  });
};
