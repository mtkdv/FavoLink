import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

import { queryKeys } from "#/const";

export const usePatchProfilePublished = () => {
  const { data: session } = useSession();
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
        `/api/users/${session!.user!.id}/profile/_published`,
        data
      );
      return res.data;
    },
    onSettled: () =>
      queryClient.invalidateQueries(queryKeys.getProfilePublished),
  });
  return profileMutation;
};
