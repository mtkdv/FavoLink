import { Schema } from "#/pages/my/like_url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useMutateVideo = () => {
  const queryClient = useQueryClient();
  const videoMutation = useMutation({
    mutationFn: async (data: Schema) => {
      const res = await axios.put(`/api/video`, data);
      // const res = await axios.post(`/api/category`, {
      //   headers: { "Content-Type": "application/json" },
      //   // body: JSON.stringify(body),
      //   data,
      // });
      // return await res.json();
      return res.data;
    },
    // FIXME: 不安定
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["youtube"] }),

    // onSettled: () =>
    //   queryClient.invalidateQueries({ queryKey: ["categories"] }),

    // ["categories", "links"].forEach((queryKey) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [queryKey],
    //   });
    // });
  });
  return videoMutation;
};
