import { Custom, Mode } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useMutateCustom = () => {
  const queryClient = useQueryClient();
  const customMutation = useMutation<
    Custom,
    AxiosError<{
      code: string;
      message: string;
    }>,
    {
      id: string;
      data: {
        backgroundImage: string | undefined;
        mode: Mode | undefined;
      };
    }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await axios.patch<Custom>(`/api/custom`, data, {
        params: {
          type: "mutateCustom",
          id,
        },
      });
      return res.data;
    },
    onSettled: () => queryClient.invalidateQueries(["custom"]),
    // useErrorBoundary(error) {
    //   if (!error.response) {
    //     return true;
    //   } else {
    //     return error.response.status >= 500;
    //   }
    // },
  });
  return customMutation;
};
