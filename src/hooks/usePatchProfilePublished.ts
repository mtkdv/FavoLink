import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks";

export const usePatchProfilePublished = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  const profileMutation = useMutation<
    Profile,
    AxiosError<{
      code: string;
      message: string;
    }>,
    {
      published: boolean;
    }
  >({
    mutationFn: async (data) => {
      const res = await axios.patch<Profile>(
        `/api/users/${userId}/profile/_published`,
        data
      );
      return res.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.getProfilePublished);
      queryClient.invalidateQueries(queryKeys.getProfile);
    },
  });
  return profileMutation;
};
