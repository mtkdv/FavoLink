import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddLink = () => {
  const queryClient = useQueryClient();
  const linkMutation = useMutation({
    mutationFn: async (body: { url: string; categoryId: string }) => {
      try {
        const res = await fetch(`/api/link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        return await res.json();
      } catch (error) {
        console.error(error);
      }
    },
    onSettled: () => queryClient.invalidateQueries(["links"]),
  });
  return linkMutation;
};
