import clsx from "clsx";
import { Control, useWatch } from "react-hook-form";

import { Schema as AddVideoSchema } from "#/pages/my/add-video";
import { Schema as ProfileSchema } from "#/pages/my/profile/index";

type InputCounterProps = {
  /** "slug" | "name" | "description" */
  name: keyof ProfileSchema;
  // name: "slug" | "name" | "description" | `youtube.${number}.categoryName`;
  // control: Control<ProfileSchema | AddVideoSchema>;
  control: Control<ProfileSchema>;
  minLength?: number;
  maxLength: number;
};

export const InputCounter = ({
  name,
  control,
  minLength,
  maxLength,
}: InputCounterProps) => {
  const value = useWatch({ name, control });
  // console.log(`InputCounter: ${name}`);
  return (
    <p>
      <span
        className={clsx(
          // "group-[:has(.error-message)]:text-red-600",
          // typeof value === "string" &&
          value && value.length > maxLength ? "text-red-600" : "",
          value && minLength && value.length > 0 && minLength > value.length
            ? "text-red-600"
            : ""
        )}
      >
        {value?.length || 0}
      </span>
      &nbsp;/ {maxLength}
    </p>
  );
};
