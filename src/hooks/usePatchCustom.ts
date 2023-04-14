import { Custom } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

import { queryKeys } from "#/const";
import { CustomFormData } from "#/types";

export const usePatchCustom = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation<
    Custom,
    AxiosError<{
      code: string;
      message: string;
    }>,
    CustomFormData
  >({
    mutationFn: async (data) => {
      const res = await axios.patch<Custom>(
        `/api/users/${session!.user!.id}/custom`,
        data
      );

      return res.data;
    },
    onSettled: () => queryClient.invalidateQueries(queryKeys.getCustom),
    // useErrorBoundary(error) {
    //   if (!error.response) {
    //     return true;
    //   } else {
    //     return error.response.status >= 500;
    //   }
    // },
  });
};
