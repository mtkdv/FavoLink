import { Transition } from "@headlessui/react";

export const FadeInOut = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Transition
      show={show}
      enter="transition duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-1"
      leave="transition duration-700"
      leaveFrom="opacity-1"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};
