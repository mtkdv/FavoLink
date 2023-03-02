import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useChangePublished = () => {
  const queryClient = useQueryClient();
  const profileMutation = useMutation<
    Profile,
    {
      message: string;
    },
    {
      id: string;
      data: {
        published: boolean;
      };
    }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await axios.patch<Profile>(`/api/profile`, data, {
        params: {
          type: "changePublished",
          id,
        },
      });
      return res.data;
    },
    onSettled: () => queryClient.invalidateQueries(["profile"]),
  });
  return profileMutation;
};
