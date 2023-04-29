import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

import { Schema } from "#/pages/my/profile";

export const Textarea = ({
  form,
  id,
  register,
  name,
  className,
}: {
  form: string;
  id: string;
  register: UseFormRegister<Schema>;
  name: keyof Schema;
  className?: string;
}) => {
  return (
    <textarea
      form={form}
      id={id}
      placeholder="&nbsp;"
      rows={6}
      className={clsx(
        "input-count peer h-full w-full rounded-md border border-stone-300 bg-white/50 px-3 py-2 tracking-wider text-stone-600 outline-none transition focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-juniper-400 group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300 [&:is(:hover,:focus-visible)]:border-juniper-500",
        className
      )}
      {...register(name)}
    />
  );
};
