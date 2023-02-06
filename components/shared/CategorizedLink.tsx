import { useGetCategories } from "#/lib/useGetCategories";
import { useGetLinks } from "#/lib/useGetLinks";
import { Link } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { VideoPlayerModal } from "./VideoPlayerModal";

type VideoCategories = {
  id: string;
  name: string;
  videos: Link[];
}[];

export const CategorizedLink: FC = () => {
  const { data: session } = useSession();

  const { data: videos } = useGetLinks(session);
  const { data: categories } = useGetCategories(session);
  const [VideoCategories, setVideoCategories] = useState<VideoCategories>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!videos || !categories) return;

    const newVideoCategories = categories.flatMap((category) => {
      const categoryVideos = videos.filter((video) => {
        return category.id === video.categoryId;
      });
      return categoryVideos.length
        ? [
            {
              id: category.id,
              name: category.name,
              videos: categoryVideos,
            },
          ]
        : [];
    });

    setVideoCategories(newVideoCategories);
  }, [videos, categories]);

  return (
    <>
      <ul className="space-y-8">
        {/* TODO: */}
        {VideoCategories ? (
          VideoCategories.length > 0 ? (
            VideoCategories.map((videoCategory) => (
              <li
                key={videoCategory.id}
                // className="bg-gradient-to-tr from-white/30 to-white/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-sm p-6 space-y-4 max-sm:max-w-xs max-sm:mx-auto"
                className="bg-gradient-to-tr from-white/30 to-white/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-sm p-6 space-y-4"
              >
                <h2 className="text-center text-xl font-medium drop-shadow-md tracking-wide">
                  {videoCategory.name}
                </h2>
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {videoCategory.videos.map((video) => (
                    <li key={video.videoId} className="">
                      <button
                        type="button"
                        onClick={() => {
                          queryClient.setQueryData(["videoData"], video);
                          setIsModalOpen(true);
                        }}
                        className="space-y-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        <div className="overflow-hidden rounded-md shadow-md">
                          <Image
                            src={video.thumbnailUrl}
                            alt="thumbnail"
                            width={320}
                            height={180}
                            className="hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="h-12 line-clamp-2 drop-shadow-md">
                          {video.title}
                        </h3>
                      </button>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.youtube.com/channel/${video.channelId}`}
                        className="flex items-center space-x-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        <div className="overflow-hidden rounded-full">
                          <Image
                            src={video.channelThumbnailUrl}
                            alt="channelThumbnail"
                            width={33}
                            height={33}
                            className="hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-xs line-clamp-1 flex-1 text-black/70 hover:text-black">
                          {video.channelTitle}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : null
        ) : (
          <p>loading...</p>
        )}
      </ul>
      <VideoPlayerModal {...{ isModalOpen, setIsModalOpen }} />
    </>
  );
};
