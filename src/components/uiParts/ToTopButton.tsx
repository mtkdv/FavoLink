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
        className="group/to-top fixed bottom-36 right-5 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-500 bg-base-white text-base-black shadow-md outline-none transition duration-200 md:bottom-24 [&:is(:hover,:focus-visible)]:scale-110 [&:is(:hover,:focus-visible)]:bg-base-black [&:is(:hover,:focus-visible)]:text-base-white"
      >
        <FaChevronUp
          size={24}
          className="transition duration-200 group-hover/to-top:-scale-x-100"
        />
      </button>
    </Transition>
  );
  // });
};
