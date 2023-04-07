import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Custom } from "@prisma/client";
import clsx from "clsx";

import { VideoPlayerModal } from "#/components/shared";
import { Videos } from "#/types";
import { queryKeys, youtube } from "#/const";

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
                "border border-white/25 border-t-white/50 border-l-white/50 rounded-2xl shadow-[0_3px_8px] shadow-black/20 backdrop-blur-sm p-6 space-y-4",
                custom.mode === "LIGHT"
                  ? "bg-white/20 text-base-black"
                  : "bg-black/20 text-white"
              )}
            >
              <h2 className="text-center text-xl font-medium drop-shadow-md tracking-wide">
                {video.categoryName}
              </h2>
              <ul className="grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
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
                      className="space-y-2 outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-2 max-w-xs"
                    >
                      <div className="overflow-hidden rounded-md shadow-md">
                        <Image
                          src={link.thumbnailUrl}
                          alt="thumbnail"
                          width={320}
                          height={180}
                          className="hover:scale-105 transition-transform"
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
                      className="flex items-center space-x-2 outline-none focus-visible:ring-2 ring-juniper-500 ring-offset-2"
                    >
                      <div className="overflow-hidden rounded-full">
                        <Image
                          src={link.channelThumbnailUrl}
                          alt="channelThumbnail"
                          width={33}
                          height={33}
                          className="hover:scale-105 transition-transform"
                        />
                      </div>
                      <p
                        className={clsx(
                          "text-xs line-clamp-1 flex-1",
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
