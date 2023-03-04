import { useState } from "react";
import Image from "next/image";
import {
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";

import { Schema } from "#/pages/my/add-video";
import { VideoForm } from "#/components/pages/my/add-video";

type Props = {
  getValues: UseFormGetValues<Schema>;
  nestIndex: number;
  index: number;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<Schema>;
};

export const VideoListItem: React.FC<Props> = ({
  getValues,
  nestIndex,
  index,
  move,
  remove,
  setValue,
}) => {
  const [hasValues, setHasValues] = useState(() => {
    return !!getValues(`videos.${nestIndex}.categoryLinks.${index}.videoId`);
  });

  const removeVideo = (index: number) => {
    remove(index);
  };

  const swapVideoItem = (fromIndex: number) => {
    move(fromIndex, fromIndex - 1);
  };

  return (
    <li className="group/video-item relative h-24 flex items-center rounded-sm ring-1 ring-stone-300 bg-white hover:ring-stone-400">
      {!hasValues ? (
        // Video Form
        <VideoForm
          {...{
            setValue,
            nestIndex,
            index,
            setHasValues,
            removeVideo,
          }}
        />
      ) : (
        // Video Preview, Result
        <>
          {/* Video Move Up Down */}
          {index === 0 || (
            <button
              type="button"
              onClick={() => swapVideoItem(index)}
              className="absolute group/swap z-10 left-1/2 -translate-x-1/2 bottom-full translate-y-0.5 rounded-sm ring-1 ring-stone-300 shadow p-0.5 bg-white [&:is(:hover,:focus-visible)]:bg-tonys-pink [&:is(:hover,:focus-visible)]:ring-tonys-pink transition duration-300"
            >
              <AiOutlineSwap
                size={16}
                transform="rotate(90)"
                className="text-stone-400 group-[:is(:hover,:focus-visible)]/swap:text-white transition duration-300"
              />
            </button>
          )}

          <div className="w-full px-1 flex space-x-2">
            {/* Left */}
            {/* <div className="overflow-hidden shrink-0 border-r border-r-stone-300"> */}
            <div className="overflow-hidden shrink-0 ring-1 ring-stone-300">
              <Image
                src={getValues(
                  `videos.${nestIndex}.categoryLinks.${index}.thumbnailUrl`
                )}
                alt="thumbnail"
                width={160}
                height={90}
                className="hover:scale-105 transition-transform"
              />
            </div>

            {/* Right: Title, Channel */}
            <div className="py-[3px] flex-1 flex flex-col justify-between">
              <div className="flex items-start space-x-1">
                {/* Title */}
                <p className="flex-1 line-clamp-2 text-sm break-all">
                  {getValues(
                    `videos.${nestIndex}.categoryLinks.${index}.title`
                  )}
                </p>

                {/* Remove Video Button */}
                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="group/remove outline-none"
                >
                  <IoMdClose
                    size={20}
                    className="text-stone-400 group-[:is(:hover,:focus-visible)]/remove:text-[#222222] transition duration-300 opacity-0 group-hover/video-item:opacity-100"
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
                      `videos.${nestIndex}.categoryLinks.${index}.channelThumbnailUrl`
                    )}
                    alt="channelThumbnail"
                    width={33}
                    height={33}
                    className="hover:scale-110 transition-transform"
                  />
                </div>
                <p className="text-xs line-clamp-1 flex-1 break-all text-base-black/70 hover:text-base-black transition-colors duration-300">
                  {getValues(
                    `videos.${nestIndex}.categoryLinks.${index}.channelTitle`
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
