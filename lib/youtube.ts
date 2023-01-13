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

type ListVideosResponse =
  | {
      type: "success";
      title: string;
      thumbnailUrl: string;
    }
  | {
      type: "error";
      code?: string;
      message: string;
    };

export const listVideos = async (id: string): Promise<ListVideosResponse> => {
  try {
    // const res = await axios.get(
    const res = await axios.get<ListVideos>(
      "https://youtube.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id,
          fields,
          // key: process.env.YOUTUBE_API_KEY,
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        },
      }
    );

    if (res.data.items.length === 0) {
      throw new TypeError("該当の動画が見つかりませんでした。");
    }

    return {
      type: "success",
      title: res.data.items[0].snippet.title,
      thumbnailUrl: res.data.items[0].snippet.thumbnails.medium.url,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      return { type: "error", code: error.code, message: error.message };
    } else if (error instanceof Error) {
      // console.error("error instanceof Error");
      console.error(error);
      return { type: "error", message: error.message };
    } else {
      console.error(error);
      // TODO: as string
      return { type: "error", message: error as string };
    }
  }
};

export const getYouTubeVideoIdFromUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
};
