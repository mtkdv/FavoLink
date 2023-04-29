import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks/useUserId";

type Data = {
  published: boolean;
};

export const usePatchProfilePublished = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  const profileMutation = useMutation<
    Profile,
    AxiosError<{
      code: string;
      message: string;
    }>,
    Data
  >({
    mutationFn: async (data) => {
      const res = await axios.patch<Profile>(
        `/api/users/${userId}/profile/_published`,
        data
      );
      return res.data;
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.getProfilePublished),
        queryClient.invalidateQueries(queryKeys.getProfile),
      ]);
    },
  });
  return profileMutation;
};
