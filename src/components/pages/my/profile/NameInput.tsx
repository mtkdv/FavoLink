import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { InputCounter } from "#/components/pages/my/profile";
import { queryKeys } from "#/const";
import { NAME_ERROR_CODE } from "#/const/profile";

export const NameInput = ({
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
  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form.profile,
    initialData: "",
    enabled: false,
  });

  return (
    <li className="group">
      {/* Name Label & Count */}
      <div className="ml-1 flex justify-between items-end">
        {/* Name Label */}
        <label htmlFor="name-input" className="flex text-cocoa-800">
          <span className="text-xs font-semibold tracking-wide">
            Display Name
          </span>
          <span className="text-red-400 leading-none">*</span>
        </label>

        {/* Name Character Count */}
        <div className="opacity-0 text-xxs text-cocoa-700 group-[:has(input:is(:focus-visible,:not(:placeholder-shown)))]:opacity-100 group-[:has(.error-message)]:opacity-100 transition-opacity duration-300">
          <InputCounter name="name" control={control} maxLength={30} />
        </div>
      </div>

      {/* Name Input & Placeholder */}
      <div className="mt-2 relative h-10">
        {/* Name input */}
        <input
          form={formId}
          id="name-input"
          placeholder="&nbsp;"
          type="text"
          className="peer w-full h-full px-3 rounded-md bg-white/50 outline-none text-stone-600 tracking-wider border border-stone-300 [&:is(:hover,:focus-visible)]:border-cocoa-300 focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-cocoa-200 transition group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300"
          {...register("name")}
        />

        {/* Name Placeholder */}
        <p className="absolute top-1/2 -translate-y-1/2 left-3.5 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
          Name
        </p>
      </div>

      {/* Name Note & Error Message */}
      <div className="mt-2 ml-1 flex space-x-2">
        <div className="w-7 flex justify-center items-start">
          <span className="w-full text-center rounded-sm bg-rose-400 text-xxxs text-white shrink-0">
            必須
          </span>
        </div>
        <div className="text-stone-500 text-xs leading-none flex-1">
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
    </li>
  );
};
