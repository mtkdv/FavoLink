import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Body = {
  slug: string;
  image: string | undefined;
  name: string;
  description: string;
};

export const useMutateProfile = () => {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: async (body: Body) => {
      try {
        const res = await axios({
          url: `/api/profile`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          data: body,
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
