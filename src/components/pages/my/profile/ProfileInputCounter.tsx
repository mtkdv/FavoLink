import { Control } from "react-hook-form";

import { InputCounter } from "#/components/pages/my/profile";
import { Schema } from "#/pages/my/profile";

export const ProfileInputCounter = ({
  name,
  control,
  minLength,
  maxLength,
}: {
  name: keyof Schema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Schema, any>;
  minLength?: number;
  maxLength: number;
}) => {
  return (
    <div className="text-xxs opacity-0 transition-opacity duration-300 group-[:has(.error-message)]:opacity-100 group-[:has(.input-count:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100">
      <InputCounter {...{ name, control, minLength, maxLength }} />
    </div>
  );
};
