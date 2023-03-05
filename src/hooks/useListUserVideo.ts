import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

import { Videos } from "#/types";
import { queryKeys } from "#/utils";

export const useListUserVideo = () => {
  const { data: session } = useSession();

  return useQuery<Videos, AxiosError>({
    queryKey: queryKeys.listUserVideo,
    queryFn: async () => {
      const res = await axios.get(`/api/users/${session!.user!.id}/videos`);

      // Loading Test
      // await new Promise((r) => setTimeout(r, 3000000));

      return res.data;
    },
    enabled: !!session && !!session.user,
    useErrorBoundary: true,
  });
};
