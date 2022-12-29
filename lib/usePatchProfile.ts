import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Data = {
  slug: string | null;
  image: string | undefined;
  name: string;
  description: string | null;
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Data }) => {
      try {
        const res = await axios.patch<Profile>(`/api/profiles/${id}`, data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);
          return { code: error.code, message: error.message };
        } else if (error instanceof Error) {
          console.error(error);
          return { message: error.message };
        } else {
          console.error(error);
          return { message: error };
        }
      }
    },
    onSettled: () => queryClient.invalidateQueries(["profile"]),
  });
  return profileMutation;
};
