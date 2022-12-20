import { FormValues } from "#/pages/my/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Body = {
  slug: string | null;
  image: string | undefined;
  name: string;
  description: string | null;
};

export const useMutateProfile = () => {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: async (body: Body) => {
      // mutationFn: async (data: FormValues) => {
      try {
        const res = await axios({
          url: `/api/profile`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          data: body,
          // data,
        });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    onSettled: () => queryClient.invalidateQueries(["profile"]),
  });
  return profileMutation;
};
