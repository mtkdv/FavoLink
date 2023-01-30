import { Schema } from "#/pages/my/profile";
import clsx from "clsx";
import { Control, useWatch } from "react-hook-form";

type InputCounterProps = {
  name: "slug" | "name" | "description";
  control: Control<Schema>;
  maxLength: string;
};

export const InputCounter = ({
  name,
  control,
  maxLength,
}: InputCounterProps) => {
  const value = useWatch({ name, control });
  // console.log(`InputCounter: ${name}`);
  return (
    <p>
      <span
        className={clsx(
          "group-[:has(.error-message)]:text-red-600",
          typeof value === "string" && value.length > 20 && "text-red-600"
        )}
      >
        {value?.length || 0}
      </span>{" "}
      / {maxLength}
    </p>
  );
};
