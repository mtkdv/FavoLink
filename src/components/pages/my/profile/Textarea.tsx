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
        "input-count peer w-full h-full px-3 py-2 rounded-md bg-white/50 outline-none text-stone-600 tracking-wider border border-stone-300 [&:is(:hover,:focus-visible)]:border-juniper-500 focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-juniper-400 transition group-[:has(.error-message)]:border-red-600 group-[:has(.error-message)]:shadow-red-300",
        className
      )}
      {...register(name)}
    />
  );
};
