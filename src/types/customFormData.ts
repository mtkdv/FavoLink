import { Mode } from "@prisma/client";

export type CustomFormData = {
  backgroundImage: string | undefined;
  mode: Mode | undefined;
};
