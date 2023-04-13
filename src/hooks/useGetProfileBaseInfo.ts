import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Profile } from "@prisma/client";

import { queryKeys } from "#/const";

type ProfileBaseInfo = Pick<Profile, "name" | "image" | "slug" | "description">;

export const useGetProfileBaseInfo = () => {
  const { data: session } = useSession();

  return useQuery<ProfileBaseInfo, AxiosError>({
    queryKey: queryKeys.getProfileBaseInfo,
    queryFn: async () => {
      const res = await axios.get<ProfileBaseInfo>(
        `/api/users/${session!.user!.id}/profile`,
        {
          params: {
            select: {
              name: true,
              image: true,
              slug: true,
              description: true,
            },
          },
        }
      );

      return res.data;
    },
    enabled: !!session && !!session.user,
    useErrorBoundary: true,
  });
};
