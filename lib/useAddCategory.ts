import { Schema } from "#/components/pages/my/link/CategoryForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const categoryMutation = useMutation({
    // mutationFn: async (body: { name: string }) => {
    mutationFn: async (data: Schema) => {
      try {
        const res = await axios.post(`/api/category`, {
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify(body),
          data,
        });
        // return await res.json();
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    onSettled: () => queryClient.invalidateQueries(["categories"]),
  });
  return categoryMutation;
};
