import { Transition } from "@headlessui/react";

import { Divider } from "#/components/uiParts";
import { usePageOffset } from "#/hooks";

export const HeaderDivider = () => {
  const isShow = usePageOffset("y", 1);

  return (
    <Transition
      show={isShow}
      // show={true}
      enter="transition duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leave="transition duration-300"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
      className="absolute bottom-0 w-full pr-3.5"
    >
      <Divider bgColor="bg-gradient-to-r from-base-white via-liver-500/50 to-base-white" />
    </Transition>
  );
};
