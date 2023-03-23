import { useId } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { InputCounter } from "#/components/pages/my/profile";
import { queryKeys } from "#/const";
import { DESC_ERROR_CODE } from "#/const/profile";

export const DescriptionTextarea = ({
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
  const textareaId = useId();
  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form.profile,
    initialData: "",
    enabled: false,
  });

  return (
    <li className="group space-y-2">
      {/* Desc Label & Count */}
      <div className="ml-1 flex justify-between items-end">
        {/* Desc Label */}
        <label
          htmlFor={textareaId}
          className="text-xs text-cocoa-800 font-semibold tracking-wide"
        >
          Selected Video Description
        </label>

        {/* Desc Character Count */}
        <div className="opacity-0 text-xxs text-cocoa-700 group-[:has(textarea:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
          <InputCounter name="description" control={control} maxLength={400} />
        </div>
      </div>

      {/* Desc Textarea & Placeholder */}
      <div className="relative">
        {/* Desc textarea */}
        <textarea
          form={formId}
          id={textareaId}
          placeholder="&nbsp;"
          rows={6}
          className="peer w-full h-full px-3 py-2 rounded-md bg-white/50 outline-none text-stone-600 tracking-wider border border-stone-300 [&:is(:hover,:focus-visible)]:border-cocoa-300 focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-cocoa-200 transition group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300"
          {...register("description")}
        />

        {/* Desc Placeholder */}
        <p className="absolute top-2 left-3.5 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
          why you selected these videos
        </p>
      </div>

      {/* Desc Note & Error Message */}
      <div className="ml-1 flex space-x-2">
        <div className="w-7 flex justify-center items-start">
          <span className="w-full text-center rounded-sm bg-teal-600 text-xxxs tracking-wide text-white shrink-0">
            Note
          </span>
        </div>
        <div className="text-stone-500 text-xs leading-none flex-1">
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
    </li>
  );
};
