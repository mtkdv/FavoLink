import { z } from "zod";

export const schema = z.object({
  youtube: z
    .array(
      z.object({
        categoryId: z.string(),
        categoryName: z
          .string()
          .max(20, "20文字以内で入力してください。")
          .superRefine((value, ctx) => {
            if (value !== "" && !value.trim()) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "スペースのみの入力はできません。",
              });
            }
          }),
        video: z
          .array(
            z.object({
              id: z.string(),
              videoId: z.string(),
              title: z.string(),
              thumbnailUrl: z.string(),
              channelId: z.string(),
              channelTitle: z.string(),
              channelThumbnailUrl: z.string(),
            })
          )
          .superRefine((values, ctx) => {
            const videoIdArray = values.map(({ videoId }) => videoId);
            const videoIdSet = new Set(videoIdArray);
            if (videoIdSet.size !== videoIdArray.length) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "コレクション内に同じ動画が重複しています。",
              });
            }
          }),
      })
    )
    .superRefine((values, ctx) => {
      const categoryNameArray = values.map(({ categoryName }) => categoryName);
      const categoryNameSet = new Set(categoryNameArray);
      if (categoryNameSet.size !== categoryNameArray.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "コレクション名が重複しています。",
        });
      }
    }),
});
