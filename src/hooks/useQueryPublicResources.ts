import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

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
    queryKey: ["PublicResources"],
    queryFn: async () => {
      const res = await axios.get(`/api/query/public-resources`, {
        params: {
          slug: router.query.slug,
        },
      });

      // loading test
      // FIXME: remove
      // await new Promise((r) => setTimeout(r, 2000));

      return res.data;
    },
    enabled: !!Object.keys(router.query).length,
    useErrorBoundary: true,
  });
};
