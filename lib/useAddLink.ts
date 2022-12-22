import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddLink = () => {
  const queryClient = useQueryClient();
  const linkMutation = useMutation({
    mutationFn: async (data: { videoId: string; categoryId: string }) => {
      try {
        const res = await axios.post(`/api/link`, {
          headers: { "Content-Type": "application/json" },
          data,
        });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    onSettled: () => queryClient.invalidateQueries(["links"]),
  });
  return linkMutation;
};
