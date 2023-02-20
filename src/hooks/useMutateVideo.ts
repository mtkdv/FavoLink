import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Schema } from "#/pages/my/add-video";

export const useMutateVideo = () => {
  const queryClient = useQueryClient();
  const videoMutation = useMutation<unknown, unknown, Schema>({
    mutationFn: async (data) => {
      const res = await axios.put(`/api/video`, data);
      return res.data;
    },
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: ["youtube"] }),
    onSuccess: (data) => {
      console.log("apiVideoResponse:", data);
      queryClient.invalidateQueries({ queryKey: ["youtube"] });
    },
    // onSuccess: (data) => {
    //   queryClient.setQueryData(["todo", { id: 5 }], data);
    // },
  });
  return videoMutation;
};
