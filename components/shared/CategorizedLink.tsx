import { Category, Link } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { VideoPlayerModal } from "./VideoPlayerModal";

type Props = {
  categories: Category[] | undefined;
  links: Link[] | undefined;
};

type CategorizedLinks = {
  categoryId: string;
  name: string;
  data: Link[];
}[];

export const CategorizedLink: FC<Props> = ({ categories, links }) => {
  const [categorizedLinks, setCategorizedLinks] = useState<CategorizedLinks>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!links || !categories) return;
    // if (!links.length || !categories.length) return [];

    const newCategorizedLinks = categories?.flatMap((category) => {
      const specifiedLinks = links?.filter((link) => {
        return category.id === link.categoryId;
      });
      return specifiedLinks.length
        ? [
            {
              categoryId: category.id,
              name: category.name,
              data: specifiedLinks,
            },
          ]
        : [];
    });

    setCategorizedLinks(newCategorizedLinks);
  }, [links, categories]);

  return (
    <section>
      <ul className="space-y-4">
        {/* TODO: */}
        {categorizedLinks ? (
          categorizedLinks.length > 0 ? (
            categorizedLinks.map((specifiedLinks) => (
              <li
                key={specifiedLinks.categoryId}
                className="bg-gradient-to-tr from-white/30 to-white/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-sm p-6 space-y-2 max-sm:max-w-xs max-sm:mx-auto"
              >
                <h3 className="text-center text-lg font-medium drop-shadow-md">
                  {specifiedLinks.name}
                </h3>
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {specifiedLinks.data.map((link) => (
                    <li key={link.videoId} className="">
                      <button
                        type="button"
                        onClick={() => {
                          queryClient.setQueryData(["videoData"], link);
                          setIsModalOpen(true);
                        }}
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                        href={`https://www.youtube.com/channel/${link.channelId}`}
                        className="flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                        <p className="text-xs line-clamp-1 flex-1 text-base-black/70 hover:text-base-black">
                          {link.channelTitle}
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
    </section>
  );
};
