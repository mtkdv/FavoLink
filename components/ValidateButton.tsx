import { Schema } from "#/pages/my/profile";
import clsx from "clsx";
import { Control, useWatch } from "react-hook-form";

type InputCounterProps = {
  isValid: boolean;
  control: Control<Schema>;
  onClick: any;
};

export const ValidateButton = ({
  isValid,
  control,
  onClick,
}: InputCounterProps) => {
  const inputCount = useWatch({ name: "slug", control });
  // console.log(`ValidateButton`);
  return (
    <button
      disabled={!isValid || !inputCount}
      className={clsx(
        "border",
        (!isValid || !inputCount) && "cursor-not-allowed"
      )}
      onClick={onClick}
    >
      使用できるか確認
    </button>
  );
};
