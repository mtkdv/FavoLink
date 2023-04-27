import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { queryKeys } from "#/const";
import { useUserId } from "#/hooks/useUserId";
import { Schema } from "#/pages/my/add-video";

export const useUpsertUserVideo = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  // TODO: レスポンスを修正後、型修正。
  const videoMutation = useMutation<
    // mutationFnの返り値の型
    Schema,
    AxiosError<{
      code: string;
      message: string;
    }>,
    // mutationFnの引数の型
    Schema
  >({
    mutationFn: async (data) => {
      // FIXME: putの返り値は現在Schemaではない。no-unsafe-return回避目的。
      const res = await axios.put<Schema>(`/api/users/${userId}/videos`, data);

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKeys.listUserVideo);
    },
  });
  return videoMutation;
};
