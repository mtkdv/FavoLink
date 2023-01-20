import { Profile } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Data = {
  published: boolean;
};

export type ChangePublishedResponse =
  | {
      type: "success";
      profile: Profile;
    }
  | {
      type: "error";
      code?: string;
      message: string;
    };

export const useChangePublished = () => {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Data }) => {
      try {
        // const res = await axios.patch<Profile>(`/api/profiles/${id}`, data);
        const res = await axios.patch<{ type: "success"; profile: Profile }>(
          `/api/profiles`,
          data,
          {
            params: {
              type: "changePublished",
              id,
            },
          }
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);
          return { type: "error", code: error.code, message: error.message };
        } else if (error instanceof Error) {
          console.error(error);
          return { type: "error", message: error.message };
        } else {
          console.error(error);
          // TODO: as string
          return { type: "error", message: error as string };
        }
      }
    },
    onSettled: () => queryClient.invalidateQueries(["profile"]),
  });
  return profileMutation;
};
