import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const categoryMutation = useMutation({
    mutationFn: async (body: { name: string; userId: string }) => {
      try {
        const res = await fetch(`/api/category`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        return await res.json();
      } catch (error) {
        console.error(error);
      }
    },
    onSettled: () => queryClient.invalidateQueries(["categories"]),
  });
  return categoryMutation;
};
