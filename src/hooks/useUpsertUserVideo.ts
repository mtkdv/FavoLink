import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks/useUserId";
import { Schema } from "#/pages/my/add-video";

export const useUpsertUserVideo = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  // TODO: レスポンスを修正後、型修正。
  const videoMutation = useMutation<unknown, unknown, Schema>({
    mutationFn: async (data) => {
      const res = await axios.put(`/api/users/${userId}/videos`, data);

      // await new Promise((r) => setTimeout(r, 3000));

      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.listUserVideo);
    },
  });
  return videoMutation;
};
