import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@prisma/client";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

export const VideoPlayer = () => {
  const { data } = useQuery<Link>(["videoData"], { enabled: false });

  return (
    <ReactPlayer
      className="aspect-video"
      url={`https://www.youtube.com/watch?v=${data!.videoId}`}
      width="100%"
      height="100%"
      controls={true}
      muted={false}
    />
  );
};
