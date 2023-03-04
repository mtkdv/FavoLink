import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Schema } from "#/pages/my/add-video";

export const useUpsertUserVideo = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // TODO: レスポンスを修正後、型修正。
  const videoMutation = useMutation<unknown, unknown, Schema>({
    mutationFn: async (data) => {
      const res = await axios.put(
        `/api/users/${session!.user!.id}/videos`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ListUserVideo"] });
    },
  });
  return videoMutation;
};
