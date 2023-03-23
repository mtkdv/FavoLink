import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { PuffLoader } from "react-spinners";

import { FormQueryKeys, queryKeys } from "#/const";

export const DashboardButton = ({
  isEnabled,
  isSubmitting,
  formKey,
}: {
  isEnabled: boolean | undefined;
  isSubmitting: boolean;
  formKey: FormQueryKeys;
}) => {
  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form[formKey],
    initialData: "",
    enabled: false,
  });

  return (
    <button
      disabled={!isEnabled || isSubmitting}
      form={formId}
      className={clsx(
        "relative group h-11 w-28 rounded-lg outline-none overflow-hidden transition bg-cocoa-400 border border-cocoa-400 flex justify-center items-center",
        isEnabled
          ? "focus-visible:ring-2 ring-cocoa-400 ring-offset-1 hover:bg-cocoa-500"
          : "cursor-not-allowed opacity-40",
        isSubmitting && "cursor-progress"
      )}
    >
      <span
        className={clsx(
          "absolute bottom-0 left-0 w-full h-1/2 rounded-b-md bg-cocoa-500 transition",
          isEnabled && "group-hover:bg-cocoa-600"
        )}
      />
      {isSubmitting ? (
        <PuffLoader color="white" size={24} />
      ) : (
        <span className="text-sm tracking-wider font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] text-white">
          変更を保存
        </span>
      )}
    </button>
  );
};
