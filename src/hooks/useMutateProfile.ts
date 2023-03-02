import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useMutateProfile = () => {
  const queryClient = useQueryClient();
  const profileMutation = useMutation<
    Profile,
    AxiosError<{
      code: string;
      message: string;
    }>,
    {
      id: string;
      data: {
        slug: string | null;
        image: string | undefined;
        name: string;
        description: string | null;
      };
    }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await axios.patch<Profile>(`/api/profile`, data, {
        params: {
          type: "mutateProfile",
          id,
        },
      });

      // loading test
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      return res.data;
    },
    onSettled: () => queryClient.invalidateQueries(["profile"]),
  });
  return profileMutation;
};
