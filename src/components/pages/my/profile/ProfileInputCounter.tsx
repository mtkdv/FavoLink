import { InputCounter } from "#/components/pages/my/profile";
import { Schema } from "#/pages/my/profile";
import { Control } from "react-hook-form";

export const ProfileInputCounter = ({
  name,
  control,
  minLength,
  maxLength,
}: {
  name: keyof Schema;
  control: Control<Schema, any>;
  minLength?: number;
  maxLength: number;
}) => {
  return (
    <div className="opacity-0 text-xxs text-cocoa-700 group-[:has(.input-count:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
      <InputCounter {...{ name, control, minLength, maxLength }} />
    </div>
  );
};
