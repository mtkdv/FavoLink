import { z } from "zod";

// export const RequestPathParameters = z.string();
export const RequestPathParameters = z.object({
  userId: z.string(),
});
