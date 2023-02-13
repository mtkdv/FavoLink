import { Schema } from "#/pages/my/profile/index";
import { SetStateAction, useEffect } from "react";
import { Control, useWatch } from "react-hook-form";

type Props = {
  setVerifiedText: React.Dispatch<SetStateAction<string>>;
  control: Control<Schema>;
};

export const ResetVerifiedText = ({ setVerifiedText, control }: Props) => {
  const value = useWatch({ name: "slug", control });

  useEffect(() => {
    setVerifiedText("");
  }, [value]);

  return null;
};
