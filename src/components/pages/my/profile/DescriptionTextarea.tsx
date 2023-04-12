import { useId } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import {
  Label,
  PlaceHolder,
  ProfileInputCounter,
  Textarea,
} from "#/components/pages/my/profile";
import { queryKeys } from "#/const";
import { DESC_ERROR_CODE } from "#/const/profile";
import { Schema } from "#/pages/my/profile";
import { Spacer } from "#/components/uiParts";

export const DescriptionTextarea = ({
  control,
  register,
  errors,
}: {
  control: Control<Schema, any>;
  register: UseFormRegister<Schema>;
  errors: FieldErrors<Schema>;
}) => {
  const textareaId = useId();
  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form.profile,
    initialData: "",
    enabled: false,
  });

  return (
    <div className="group">
      <div className="ml-1 flex items-end justify-between">
        <Label htmlFor={textareaId}>Selected Video Description</Label>
        <ProfileInputCounter
          name="description"
          control={control}
          maxLength={400}
        />
      </div>

      <Spacer size={8} axis="column" />

      <div className="relative">
        <Textarea
          form={formId}
          id={textareaId}
          register={register}
          name="description"
        />
        <PlaceHolder className="top-2">
          why you selected these videos
        </PlaceHolder>
      </div>

      <Spacer size={8} axis="column" />

      {/* Desc Note & Error Message */}
      <div className="ml-1 flex space-x-2">
        <p className="w-7 shrink-0 self-start rounded-sm bg-teal-600 text-center text-xxxs tracking-wide text-white">
          Note
        </p>
        <div className="flex-1 text-xs leading-none text-stone-500">
          <p>
            <span
              className={clsx(
                errors.description?.message &&
                  DESC_ERROR_CODE.TOO_BIG === errors.description.message &&
                  "error-message text-red-600"
              )}
            >
              400文字以内。
            </span>
            <span
              className={clsx(
                errors.description?.message &&
                  DESC_ERROR_CODE.WHITESPACE === errors.description.message &&
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
