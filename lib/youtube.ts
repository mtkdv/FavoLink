import axios from "axios";

const fields = "items/snippet(title,thumbnails/medium/url)";

type Video = {
  title: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
};

export const listVideos = async (url: string) => {
  const id = getYouTubeVideoIdFromUrl(url);
  try {
    const res = await axios.get(
      "https://youtube.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id,
          fields,
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        },
      }
    );
    return res.data.items[0].snippet as Video;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getYouTubeVideoIdFromUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
};
