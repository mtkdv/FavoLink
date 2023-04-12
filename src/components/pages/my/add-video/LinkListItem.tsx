import Image from "next/image";
import { useState } from "react";
import {
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";

import { Schema } from "#/pages/my/add-video";
import { LinkForm } from "#/components/pages/my/add-video";
import { useLayoutAnimation } from "#/hooks";

export const LinkListItem = ({
  getValues,
  categoryIndex,
  linkIndex,
  move,
  remove,
  setValue,
}: {
  getValues: UseFormGetValues<Schema>;
  categoryIndex: number;
  linkIndex: number;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<Schema>;
}) => {
  const [hasValues, setHasValues] = useState(() => {
    return !!getValues(
      `videos.${categoryIndex}.categoryLinks.${linkIndex}.videoId`
    );
  });

  const removeVideo = (index: number) => {
    remove(index);
  };

  const swapVideoItem = (fromIndex: number) => {
    move(fromIndex, fromIndex - 1);
  };

  // Layout Animation
  const { liRef } = useLayoutAnimation(linkIndex);

  return (
    <li
      ref={liRef}
      className="group/video-item relative flex h-24 items-center rounded-sm border border-stone-300 bg-white/50 hover:border-stone-400"
    >
      {!hasValues ? (
        // Link Add Form
        <LinkForm
          {...{
            setValue,
            categoryIndex,
            linkIndex,
            setHasValues,
            removeVideo,
          }}
        />
      ) : (
        // Video Preview, Result
        <>
          {/* Video Move Up Down */}
          {linkIndex === 0 || (
            <button
              type="button"
              onClick={() => swapVideoItem(linkIndex)}
              className="group/swap absolute bottom-full left-1/2 z-10 -translate-x-1/2 translate-y-0.5 rounded-sm border border-stone-300 bg-white p-0.5 shadow outline-none transition duration-300 [&:is(:hover,:focus-visible)]:border-juniper-500 [&:is(:hover,:focus-visible)]:bg-juniper-500"
            >
              <AiOutlineSwap
                size={16}
                transform="rotate(90)"
                className="text-stone-400 transition duration-300 group-[:is(:hover,:focus-visible)]/swap:text-white"
              />
            </button>
          )}

          <div className="flex w-full space-x-2 px-1">
            {/* Left */}
            {/* <div className="overflow-hidden shrink-0 border-r border-r-stone-300"> */}
            <div className="shrink-0 overflow-hidden ring-1 ring-stone-300">
              <Image
                src={getValues(
                  `videos.${categoryIndex}.categoryLinks.${linkIndex}.thumbnailUrl`
                )}
                alt="thumbnail"
                width={160}
                height={90}
                className="transition-transform hover:scale-105"
              />
            </div>

            {/* Right: Title, Channel */}
            <div className="flex flex-1 flex-col justify-between py-[3px]">
              <div className="flex items-start space-x-1">
                {/* Title */}
                <p className="flex-1 break-all text-sm line-clamp-2">
                  {getValues(
                    `videos.${categoryIndex}.categoryLinks.${linkIndex}.title`
                  )}
                </p>

                {/* Remove Video Button */}
                <button
                  type="button"
                  onClick={() => removeVideo(linkIndex)}
                  className="group/remove outline-none"
                >
                  <IoMdClose
                    size={20}
                    className="text-stone-400 opacity-0 transition duration-300 group-hover/video-item:opacity-100 group-focus-visible/remove:opacity-100 group-[:is(:hover,:focus-visible)]/remove:text-red-400"
                  />
                </button>
              </div>

              {/* Channel */}
              {/* <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.youtube.com/channel/${getValues(
                  `youtube.${nestIndex}.video.${index}.channelId`
                )}`}
                className="flex items-center space-x-2 pr-2 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              > */}
              <div className="flex items-center space-x-2 pr-2">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={getValues(
                      `videos.${categoryIndex}.categoryLinks.${linkIndex}.channelThumbnailUrl`
                    )}
                    alt="channelThumbnail"
                    width={33}
                    height={33}
                    className="transition-transform hover:scale-110"
                  />
                </div>
                <p className="flex-1 break-all text-xs text-base-black/70 transition-colors duration-300 line-clamp-1 hover:text-base-black">
                  {getValues(
                    `videos.${categoryIndex}.categoryLinks.${linkIndex}.channelTitle`
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
