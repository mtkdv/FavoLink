import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks";

export type ProfileBaseInfo = Pick<
  Profile,
  "name" | "image" | "slug" | "description"
>;

export const useGetProfileBaseInfo = () => {
  const userId = useUserId();

  return useQuery<ProfileBaseInfo, AxiosError>({
    queryKey: queryKeys.getProfileBaseInfo,
    queryFn: async () => {
      const res = await axios.get<ProfileBaseInfo>(
        `/api/users/${userId}/profile`,
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

      await new Promise((r) => setTimeout(r, 1000));

      return res.data;
    },
    enabled: !!userId,
    useErrorBoundary: true,
  });

  // const isLoading = <T>(data: T | undefined): data is T => {
  //   return isLoadingDefault;
  // };

  // return { data, isLoading };
};
