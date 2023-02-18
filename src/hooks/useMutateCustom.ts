import { Custom, Mode } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useMutateCustom = () => {
  const queryClient = useQueryClient();
  const customMutation = useMutation<
    Custom,
    // {
    //   backgroundImage: string | null;
    // },
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
      // const res = await axios.patch<Data>(`/api/profiles`, data, {
      const res = await axios.patch<Custom>(`/api/custom`, data, {
        params: {
          type: "mutateCustom",
          id,
        },
      });
      return res.data;
    },
    // onSettled: () => queryClient.invalidateQueries(["profile"]),
    onSettled: () => queryClient.invalidateQueries(["custom"]),
  });
  return customMutation;
};
