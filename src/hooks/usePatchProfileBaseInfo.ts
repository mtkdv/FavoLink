import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks/useUserId";
import { ProfileFormData } from "#/types";

export const usePatchProfileBaseInfo = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  return useMutation<
    Profile,
    AxiosError<{
      code: string;
      message: string;
    }>,
    ProfileFormData
  >({
    mutationFn: async (data) => {
      const res = await axios.patch<Profile>(
        `/api/users/${userId}/profile/_baseInfo`,
        data
      );

      return res.data;
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries(queryKeys.getProfileBaseInfo),
        queryClient.invalidateQueries(queryKeys.getProfile),
      ]);
    },
  });
};
