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
        "group h-11 rounded-lg pl-1.5 pr-3 bg-white outline-none text-cocoa-400 border border-cocoa-400 transition duration-300 flex items-center",
        isEnabled
          ? "[&:is(:hover,:focus-visible)]:bg-cocoa-400 [&:is(:hover,:focus-visible)]:text-white"
          : "cursor-not-allowed opacity-40 border-neutral-400 text-neutral-500"
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
