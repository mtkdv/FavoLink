import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { VideoPlayer } from "./VideoPlayer";

export const VideoPlayerModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog onClose={() => setIsModalOpen(false)} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full justify-center items-center px-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* <Dialog.Panel className="relative w-full max-w-sm rounded-2xl bg-base-white shadow-[4px_5px_7px_5px_rgba(0,0,0,0.07)]"> */}
              <Dialog.Panel className="w-full shadow-[4px_5px_7px_5px_rgba(0,0,0,0.07)]">
                {/* <Dialog.Title>title</Dialog.Title>
                <Dialog.Description>description</Dialog.Description> */}
                <VideoPlayer />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
