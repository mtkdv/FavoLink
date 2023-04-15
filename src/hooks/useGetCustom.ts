import { Custom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks";

export const useGetCustom = () => {
  const userId = useUserId();

  return useQuery<Custom, AxiosError>({
    queryKey: queryKeys.getCustom,
    queryFn: async () => {
      const res = await axios.get(`/api/users/${userId}/custom`);

      await new Promise((r) => setTimeout(r, 1000));

      return res.data;
    },
    enabled: !!userId,
    useErrorBoundary: true,
  });
};
