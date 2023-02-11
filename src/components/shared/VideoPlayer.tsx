import React, { FC } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@prisma/client";
import Error from "next/error";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

export const VideoPlayer: FC = () => {
  const { data, isLoading, isError, error } = useQuery<
    Link,
    { code: number; message: string }
  >(["videoData"], { enabled: false });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <Error statusCode={error.code} title={error.message} />;
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
