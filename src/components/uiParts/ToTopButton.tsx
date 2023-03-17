import { Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";

import { usePageOffset } from "#/hooks";

export const ToTopButton = ({
  refCurrent,
}: {
  refCurrent: HTMLElement | null;
}) => {
  const isShow = usePageOffset("y", 100);

  const handleScrollTop = () => {
    refCurrent?.scrollIntoView({
      behavior: "smooth",
    });
  };

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
    >
      <button
        onClick={handleScrollTop}
        className="group/to-top fixed bottom-36 md:bottom-24 right-5 w-10 h-10 rounded-full bg-base-white text-base-black flex items-center justify-center overflow-hidden border border-zinc-500 shadow-md [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-base-white transition duration-200 outline-none [&:is(:hover,:focus-visible)]:scale-110"
      >
        <FaChevronUp
          size={24}
          className="group-hover/to-top:-scale-x-100 transition duration-200"
        />
      </button>
    </Transition>
  );
  // });
};
