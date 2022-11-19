import axios from "axios";

const fields = "items/snippet(title,thumbnails/medium/url)";

export const listVideos = async (url: string) => {
  // urlからvideoIdを取得する正規表現は後回しにして、まず動作確認をしたい。
  // 一旦、urlではなくvideoIdを渡す。
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
    return {
      title: res.data.items[0].snippet.title,
      thumbnailUrl: res.data.items[0].snippet.thumbnails.medium.url,
    };
  } catch (error: any) {
    // console.log(error);
    // エラーを投げることでundefinedを返さなくて済む。
    throw new Error(error);
  }
};

const getYouTubeVideoIdFromUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
};
