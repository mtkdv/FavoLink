import axios from "axios";

const fields = "items/snippet(title,thumbnails/medium/url)";

type ListVideos = {
  items: {
    snippet: {
      title: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
  }[];
};

export const listVideos = async (id: string) => {
  try {
    const res = await axios.get(
      "https://youtube.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id,
          fields,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );
    // return res.data.items[0].snippet as Video;
    return res.data as ListVideos;
  } catch (error: any) {
    // TODO: handle error
    console.log("listVideosError:", error.message);
  }
};

export const getYouTubeVideoIdFromUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
};
