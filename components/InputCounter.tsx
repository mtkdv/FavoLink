import { FormValues } from "#/pages/my/profile";
import { Control, useWatch } from "react-hook-form";

type InputCounterProps = {
  name: "slug" | "name" | "description";
  control: Control<FormValues>;
  maxLength: string;
};

export const InputCounter = ({
  name,
  control,
  maxLength,
}: InputCounterProps) => {
  const value = useWatch({ name, control });
  return (
    <p>
      {value?.length || 0}/{maxLength}
    </p>
  );
};
