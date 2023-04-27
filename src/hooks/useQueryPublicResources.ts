import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

import { queryKeys } from "#/const";
import { PublicResources } from "#/types";

export const useQueryPublicResources = () => {
  const router = useRouter();

  return useQuery<
    PublicResources,
    AxiosError<{
      code: string;
      message: string;
    }>
  >({
    queryKey: queryKeys.publicResources,
    queryFn: async () => {
      const res = await axios.get<PublicResources>(
        `/api/query/public-resources`,
        {
          params: {
            slug: router.query.slug,
          },
        }
      );

      return res.data;
    },
    enabled: !!Object.keys(router.query).length,
    useErrorBoundary: true,
  });
};
