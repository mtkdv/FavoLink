import { useId } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import {
  Input,
  Label,
  PlaceHolder,
  ProfileInputCounter,
  UrlPrefix,
} from "#/components/pages/my/profile";
import { queryKeys } from "#/const";
import { SLUG_ERROR_CODE } from "#/const/profile";
import { Schema } from "#/pages/my/profile";
import { Spacer } from "#/components/uiParts";

export const PublicUrlInput = ({
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
      <div className="ml-1 flex items-end justify-between">
        <Label htmlFor={inputId}>Public URL</Label>
        <ProfileInputCounter
          name="slug"
          control={control}
          minLength={4}
          maxLength={20}
        />
      </div>

      <Spacer size={8} axis="column" />

      <div className="flex h-10">
        <UrlPrefix />

        <div className="relative flex-1">
          <Input
            form={formId}
            id={inputId}
            register={register}
            name="slug"
            className="rounded-r-md"
          />
          <PlaceHolder className="top-1/2 -translate-y-1/2">
            your-content-path
          </PlaceHolder>
        </div>
      </div>

      <Spacer size={8} axis="column" />

      <div className="ml-1 flex space-x-2">
        <p className="w-7 shrink-0 self-start rounded-sm bg-teal-600 text-center text-xxxs tracking-wide text-white">
          Note
        </p>
        <div
          className={clsx(
            // "text-xs leading-none flex-1 space-y-1.5 h-12",
            "relative flex-1 space-y-1.5 text-xs leading-none text-stone-500"
            // errors.slug?.message &&
            //   SLUG_ERROR_CODES.includes(errors.slug.message)
            //   ? "text-red-600"
            //   : "text-stone-500"
          )}
        >
          <p>
            <span
              className={clsx(
                errors.slug?.message &&
                  SLUG_ERROR_CODE.RANGE === errors.slug.message &&
                  "error-message text-red-600"
              )}
            >
              4~20文字以内。
            </span>
            <span
              className={clsx(
                errors.slug?.message &&
                  SLUG_ERROR_CODE.REGEX === errors.slug.message &&
                  "error-message text-red-600"
              )}
            >
              英数字(小文字)、ハイフン(-)のみ使用できます。
            </span>
          </p>
          <p
            className={clsx(
              errors.slug?.message &&
                SLUG_ERROR_CODE.REGEX === errors.slug.message &&
                "error-message text-red-600"
            )}
          >
            ハイフンは連続して使用はできず、また先頭と末尾にも使用できません。
          </p>
          {errors.slug?.type && errors.slug.type === "duplicate" && (
            <p className="error-message absolute text-red-600">
              {errors.slug.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
