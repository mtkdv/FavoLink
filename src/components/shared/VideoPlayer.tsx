import { Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { queryKeys } from "#/const";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

export const VideoPlayer = () => {
  const { data } = useQuery<Link>(queryKeys.playVideoData, { enabled: false });

  return data ? (
    <ReactPlayer
      className="aspect-video"
      url={`https://www.youtube.com/watch?v=${data.videoId}`}
      width="100%"
      height="100%"
      controls={true}
      muted={false}
    />
  ) : null;
};
