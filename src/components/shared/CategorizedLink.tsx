import { Custom } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";

import { VideoPlayerModal } from "#/components/shared";
import { queryKeys, youtube } from "#/const";
import { Videos } from "#/types";

export const CategorizedLink = ({
  videos,
  custom,
}: {
  videos: Videos;
  custom: Custom;
}) => {
  const queryClient = useQueryClient();

  return (
    <>
      <ul className="space-y-8">
        {videos.length > 0 &&
          videos.map((video) => (
            <li
              key={video.categoryId}
              className={clsx(
                "space-y-4 rounded-2xl border border-white/25 border-l-white/50 border-t-white/50 p-6 shadow-[0_3px_8px] shadow-black/20 backdrop-blur-sm",
                custom.mode === "LIGHT"
                  ? "bg-white/20 text-base-black"
                  : "bg-black/20 text-white"
              )}
            >
              <h2 className="text-center text-xl font-medium tracking-wide drop-shadow-md">
                {video.categoryName}
              </h2>
              <ul className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
                {video.categoryLinks.map((link) => (
                  <li key={link.videoId} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        queryClient.setQueryData(queryKeys.playVideoData, link);
                        // setIsModalOpen(true);
                        queryClient.setQueryData(
                          queryKeys.videoPlayerModal,
                          true
                        );
                      }}
                      className="max-w-xs space-y-2 outline-none ring-juniper-500 ring-offset-2 focus-visible:ring-2"
                    >
                      <div className="overflow-hidden rounded-md shadow-md">
                        <Image
                          src={link.thumbnailUrl}
                          alt="thumbnail"
                          width={320}
                          height={180}
                          className="transition-transform hover:scale-105"
                        />
                      </div>
                      <h3 className="line-clamp-2 drop-shadow-md">
                        {link.title}
                      </h3>
                    </button>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${youtube.channel}${link.channelId}`}
                      className="flex items-center space-x-2 outline-none ring-juniper-500 ring-offset-2 focus-visible:ring-2"
                    >
                      <div className="overflow-hidden rounded-full">
                        <Image
                          src={link.channelThumbnailUrl}
                          alt="channelThumbnail"
                          width={33}
                          height={33}
                          className="transition-transform hover:scale-105"
                        />
                      </div>
                      <p
                        className={clsx(
                          "line-clamp-1 flex-1 text-xs",
                          custom.mode === "LIGHT"
                            ? "text-black/70 hover:text-base-black"
                            : "text-white/70 hover:text-white"
                        )}
                      >
                        {link.channelTitle}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
      <VideoPlayerModal />
    </>
  );
};
