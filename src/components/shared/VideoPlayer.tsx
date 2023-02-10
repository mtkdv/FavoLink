import React, { FC } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@prisma/client";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

export const VideoPlayer: FC = () => {
  const { data, isLoading, isError, error } = useQuery<Link, any>(
    ["videoData"],
    { enabled: false }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ReactPlayer
      className="aspect-video"
      url={`https://www.youtube.com/watch?v=${data.videoId}`}
      width="100%"
      height="100%"
      controls={true}
      muted={false}
    />
  );
};
