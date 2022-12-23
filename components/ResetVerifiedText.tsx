import { FormValues } from "#/pages/my/profile";
import { SetStateAction, useEffect } from "react";
import { Control, useWatch } from "react-hook-form";

type Props = {
  setVerifiedText: React.Dispatch<SetStateAction<string>>;
  control: Control<FormValues>;
};

export const ResetVerifiedText = ({ setVerifiedText, control }: Props) => {
  const value = useWatch({ name: "slug", control });

  useEffect(() => {
    setVerifiedText("");
  }, [value]);

  return null;
};
