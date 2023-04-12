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
        "group relative flex h-11 w-28 items-center justify-center overflow-hidden rounded-lg border border-teal-600 bg-teal-600 outline-none transition",
        isEnabled
          ? "ring-teal-600 ring-offset-1 hover:bg-teal-700 focus-visible:ring-2"
          : "cursor-not-allowed opacity-40",
        isSubmitting && "cursor-progress"
      )}
    >
      {/* <span
        className={clsx(
          "absolute bottom-0 left-0 w-full h-1/2 rounded-b-md bg-teal-700 transition",
          isEnabled && "group-hover:bg-teal-800"
        )}
      /> */}
      {isSubmitting ? (
        <PuffLoader color="white" size={24} />
      ) : (
        <span className="text-sm font-semibold tracking-wider text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          変更を保存
        </span>
      )}
    </button>
  );
};
