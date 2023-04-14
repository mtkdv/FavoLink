import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

import { queryKeys } from "#/const";
import { ProfileFormData } from "#/types";

export const usePatchProfileBaseInfo = () => {
  const { data: session } = useSession();
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
        `/api/users/${session!.user!.id}/profile/_baseinfo`,
        data
      );

      return res.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.getProfileBaseInfo);
      queryClient.invalidateQueries(queryKeys.getProfile);
    },
  });
};
