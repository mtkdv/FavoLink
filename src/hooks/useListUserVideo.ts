import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks/useUserId";
import { Videos } from "#/types";

export const useListUserVideo = () => {
  const userId = useUserId();

  return useQuery<Videos, AxiosError>({
    queryKey: queryKeys.listUserVideo,
    queryFn: async () => {
      const res = await axios.get<Videos>(`/api/users/${userId}/videos`);

      // Loading Test
      await new Promise((r) => setTimeout(r, 1000));

      return res.data;
    },
    enabled: !!userId,
    useErrorBoundary: true,
  });
};
