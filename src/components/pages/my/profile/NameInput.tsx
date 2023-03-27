import { useId } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import {
  Input,
  Label,
  PlaceHolder,
  ProfileInputCounter,
} from "#/components/pages/my/profile";
import { queryKeys } from "#/const";
import { NAME_ERROR_CODE } from "#/const/profile";
import { Schema } from "#/pages/my/profile";
import { Spacer } from "#/components/uiParts";

export const NameInput = ({
  control,
  register,
  errors,
}: {
  control: Control<Schema, any>;
  register: UseFormRegister<Schema>;
  errors: FieldErrors<Schema>;
}) => {
  const inputId = useId();
  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form.profile,
    initialData: "",
    enabled: false,
  });

  return (
    <div className="group">
      <div className="ml-1 flex justify-between items-end">
        <Label htmlFor={inputId}>
          Display Name
          <span className="text-red-400 leading-none">*</span>
        </Label>
        <ProfileInputCounter name="name" control={control} maxLength={30} />
      </div>

      <Spacer size={8} axis="column" />

      <div className="relative h-10">
        <Input
          form={formId}
          id={inputId}
          register={register}
          name="name"
          className="rounded-md"
        />
        <PlaceHolder className="top-1/2 -translate-y-1/2">Name</PlaceHolder>
      </div>

      <Spacer size={8} axis="column" />

      <div className="ml-1 flex space-x-2">
        <p className="w-7 self-start text-center rounded-sm bg-rose-400 text-xxxs text-white shrink-0">
          必須
        </p>
        <div className="flex-1 text-stone-500 text-xs leading-none">
          <p>
            <span
              className={clsx(
                errors.name?.message &&
                  NAME_ERROR_CODE.RANGE === errors.name.message &&
                  "error-message text-red-600"
              )}
            >
              1~30文字以内。
            </span>
            <span
              className={clsx(
                errors.name?.message &&
                  NAME_ERROR_CODE.WHITESPACE === errors.name.message &&
                  "error-message text-red-600"
              )}
            >
              空白文字のみは使用できません。
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
