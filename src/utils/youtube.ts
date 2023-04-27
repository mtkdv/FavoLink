import axios, { isAxiosError } from "axios";

type ListVideos = {
  items: {
    snippet: {
      channelId: string;
      title: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
      channelTitle: string;
    };
  }[];
};

type ListVideosResponse =
  | {
      type: "success";
      channelId: string;
      title: string;
      thumbnailUrl: string;
      channelTitle: string;
    }
  | {
      type: "error";
      code?: string;
      message: string;
    };

export const listVideos = async (id: string): Promise<ListVideosResponse> => {
  try {
    const res = await axios.get<ListVideos>(
      "https://youtube.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id,
          fields:
            "items/snippet(channelId,title,thumbnails/medium/url,channelTitle)",
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        },
      }
    );

    if (res.data.items.length === 0) {
      throw new TypeError("該当の動画が見つかりませんでした。");
    }

    return {
      type: "success",
      channelId: res.data.items[0].snippet.channelId,
      title: res.data.items[0].snippet.title,
      thumbnailUrl: res.data.items[0].snippet.thumbnails.medium.url,
      channelTitle: res.data.items[0].snippet.channelTitle,
    };
  } catch (error) {
    if (isAxiosError(error)) {
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

type ListChannels = {
  items: {
    snippet: {
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
  }[];
};

type ListChannelsResponse =
  | {
      type: "success";
      channelThumbnailUrl: string;
    }
  | {
      type: "error";
      code?: string;
      message: string;
    };

export const listChannels = async (
  id: string
): Promise<ListChannelsResponse> => {
  try {
    const res = await axios.get<ListChannels>(
      "https://youtube.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          id,
          fields: "items/snippet/thumbnails/medium/url",
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        },
      }
    );

    // if (res.data.items.length === 0) {
    //   throw new TypeError("該当の動画が見つかりませんでした。");
    // }

    return {
      type: "success",
      channelThumbnailUrl: res.data.items[0].snippet.thumbnails.medium.url,
    };
  } catch (error) {
    if (isAxiosError(error)) {
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
