import { Schema } from "#/pages/my/profile";
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
      {value?.length || 0}/{maxLength}
    </p>
  );
};
