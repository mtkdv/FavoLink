import clsx from "clsx";
import { RiAddLine } from "react-icons/ri";

import { Spacer } from "#/components/uiParts";

export const AddCategoryButton = ({
  isEnabled,
  appendCategory,
}: {
  isEnabled: boolean;
  appendCategory: () => void;
}) => {
  return (
    <button
      type="button"
      disabled={!isEnabled}
      onClick={appendCategory}
      className={clsx(
        "group flex h-11 items-center rounded-lg border border-teal-600 bg-white pl-1.5 pr-3 text-teal-600 outline-none transition duration-300",
        isEnabled
          ? "[&:is(:hover,:focus-visible)]:bg-teal-600 [&:is(:hover,:focus-visible)]:text-white"
          : "cursor-not-allowed border-neutral-400 text-neutral-500 opacity-40"
      )}
    >
      <span className="relative">
        <RiAddLine
          size={24}
          className={clsx(
            "absolute",
            isEnabled && "group-[:is(:hover,:focus-visible)]:animate-myPing"
          )}
        />
        <RiAddLine size={24} />
      </span>
      <Spacer size={4} axis="row" />
      <span>Add Category</span>
    </button>
  );
};
