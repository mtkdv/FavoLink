import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const usePatchProfile = () => {
  const queryClient = useQueryClient();
  const profileMutation = useMutation<
    Profile,
    {
      message: string;
    },
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
      const res = await axios.patch<Profile>(`/api/profiles`, data, {
        params: {
          type: "patchProfile",
          id,
        },
      });
      return res.data;
    },
    onSettled: () => queryClient.invalidateQueries(["profile"]),
  });
  return profileMutation;
};
