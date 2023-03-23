import { useId } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { InputCounter } from "#/components/pages/my/profile";
import { queryKeys, urls } from "#/const";
import { SLUG_ERROR_CODE } from "#/const/profile";

export const PublicUrlInput = ({
  control,
  register,
  errors,
}: {
  control: Control<
    {
      name: string;
      description: string | null;
      slug: string | null;
    },
    any
  >;
  register: UseFormRegister<{
    name: string;
    slug: string | null;
    description: string | null;
  }>;
  errors: FieldErrors<{
    name: string;
    slug: string | null;
    description: string | null;
  }>;
}) => {
  const inputId = useId();
  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form.profile,
    initialData: "",
    enabled: false,
  });

  return (
    <li className="group space-y-2">
      {/* URL label & Count */}
      <div className="ml-1 flex justify-between items-end">
        {/* URL Label */}
        <label
          htmlFor={inputId}
          className="text-xs text-cocoa-800 font-semibold tracking-wide"
        >
          Public URL
        </label>

        {/* URL Character Count */}
        <div className="opacity-0 text-xxs text-cocoa-700 group-[:has(input:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
          <InputCounter
            name="slug"
            control={control}
            minLength={4}
            maxLength={20}
          />
        </div>
      </div>

      {/* URL Inputs */}
      <div className="h-10 flex">
        {/* URL Prefix */}
        <div className="w-44 bg-stone-100/90 grid place-items-center border border-r-0 border-stone-300 rounded-l-md">
          <p className="text-stone-800 font-light tracking-wider">
            {urls.domain}
          </p>
        </div>

        {/* URL Input & Plaseholder */}
        <div className="relative flex-1">
          <input
            form={formId}
            id={inputId}
            placeholder="&nbsp;"
            type="text"
            className="peer w-full h-full px-3 rounded-r-md bg-white/50 outline-none text-stone-600 tracking-wider border border-stone-300 [&:is(:hover,:focus-visible)]:border-cocoa-300 focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-cocoa-200 transition group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300"
            {...register("slug")}
          />

          {/* URL Placeholder */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3.5 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
            your-content-path
          </div>
        </div>
      </div>

      {/* URL Note & Error Message */}
      <div className="ml-1 flex space-x-2">
        <div className="w-7 flex justify-center items-start">
          <span className="w-full text-center rounded-sm bg-teal-600 text-xxxs tracking-wide text-white shrink-0">
            Note
          </span>
        </div>
        <div
          className={clsx(
            // "text-xs leading-none flex-1 space-y-1.5 h-12",
            "relative text-stone-500 text-xs leading-none flex-1 space-y-1.5"
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
    </li>
  );
};
