import { Dialog, Transition } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";

import { VideoPlayer } from "#/components/shared/VideoPlayer";
import { queryKeys } from "#/const";

export const VideoPlayerModal = () => {
  const { data: isModalShow } = useQuery({
    queryKey: queryKeys.videoPlayerModal,
    initialData: false,
    enabled: false,
  });
  const queryClient = useQueryClient();

  return (
    <Transition appear show={isModalShow} as={Fragment}>
      <Dialog
        onClose={() =>
          queryClient.setQueryData(queryKeys.videoPlayerModal, false)
        }
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full">
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
