import { z } from "zod";

import {
  DESC_ERROR_CODE,
  NAME_ERROR_CODE,
  SLUG_ERROR_CODE,
} from "#/const/profile";

export const schema = z.object({
  name: z
    .string()
    // .min(1, "名前を入力してください。")
    // .max(30, "30文字以内で入力してください。")
    // .refine((value) => !!value.trim(), "空白文字のみの入力はできません。")
    .superRefine((value, ctx) => {
      const valueLength = value.length;

      if (valueLength === 0 || 30 < valueLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: NAME_ERROR_CODE.RANGE,
          fatal: true,
        });
        return z.NEVER;
      }

      if (!value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: NAME_ERROR_CODE.WHITESPACE,
        });
      }
    }),
  slug: z
    .string()
    // .max(
    //   20,
    //   "4~20文字、英数字(小文字)、ハイフン(-)は文字間にのみ使用できます。"
    // )
    .transform((value, ctx) => {
      const valueLength = value.length;

      if (valueLength === 0) return null;

      if (valueLength < 4 || 20 < valueLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: SLUG_ERROR_CODE.RANGE,
          // message: SLUG_ERROR_CODE.RANGE as typeof SLUG_ERROR_CODE[keyof typeof SLUG_ERROR_CODE],
        });
        return z.NEVER;
      }

      const regex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-[a-zA-Z0-9])*$/;
      if (!regex.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: SLUG_ERROR_CODE.REGEX,
        });
      }

      return value;
    })
    .nullable(),
  description: z
    .string()
    .max(400, DESC_ERROR_CODE.TOO_BIG)
    .superRefine((value, ctx) => {
      if (value.length > 0 && !value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: DESC_ERROR_CODE.WHITESPACE,
        });
      }
    })
    .nullable(),
});
