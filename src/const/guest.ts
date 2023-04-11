const nameAndImage = {
  name: "Cat",
  image: "https://source.unsplash.com/hxn2HjZHyQE",
};

export const guestUser = {
  ...nameAndImage,
  email: "guest@example.com",
};

export const guestProfile = {
  ...nameAndImage,
  slug: "my-cat-guest",
  description: null,
  published: false,
};

export const guestCustom = {
  backgroundImage: "https://source.unsplash.com/xgTMSz6kegE",
  mode: "DARK" as const,
};

export const guestVideos = [
  {
    categoryName: "Vercel",
    categoryLinks: [
      {
        videoId: "2o5m1ovfl3c",
        title: "Loading UI with Next.js 13 and React Suspense",
        thumbnailUrl: "https://i.ytimg.com/vi/2o5m1ovfl3c/mqdefault.jpg",
        channelId: "UCLq8gNoee7oXM7MvTdjyQvA",
        channelTitle: "Vercel",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJUuU1obc7kaKXA9K4Ao1oMNNcM8Xy4nKK8AjC_lJQ=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "6ZwnBI4Rb1w",
        title: "What is Turbopack?",
        thumbnailUrl: "https://i.ytimg.com/vi/6ZwnBI4Rb1w/mqdefault.jpg",
        channelId: "UCLq8gNoee7oXM7MvTdjyQvA",
        channelTitle: "Vercel",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJUuU1obc7kaKXA9K4Ao1oMNNcM8Xy4nKK8AjC_lJQ=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "UfNMlhu3L4I",
        title: "Next.js 13.2 Explained!",
        thumbnailUrl: "https://i.ytimg.com/vi/UfNMlhu3L4I/mqdefault.jpg",
        channelId: "UCLq8gNoee7oXM7MvTdjyQvA",
        channelTitle: "Vercel",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJUuU1obc7kaKXA9K4Ao1oMNNcM8Xy4nKK8AjC_lJQ=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "9Q9_CQxFUKY",
        title: "Build a GPT-3 AI app with Next.js and Vercel Edge Functions",
        thumbnailUrl: "https://i.ytimg.com/vi/9Q9_CQxFUKY/mqdefault.jpg",
        channelId: "UCLq8gNoee7oXM7MvTdjyQvA",
        channelTitle: "Vercel",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJUuU1obc7kaKXA9K4Ao1oMNNcM8Xy4nKK8AjC_lJQ=s240-c-k-c0x00ffffff-no-rj",
      },
    ],
  },
  {
    categoryName: "Year in Search",
    categoryLinks: [
      {
        videoId: "2o5m1ovfl3c",
        title: "Google — Year in Search 2022",
        thumbnailUrl: "https://i.ytimg.com/vi/4WXs3sKu41I/mqdefault.jpg",
        channelId: "UCK8sQmJBp8GCxrOtXWBpyEA",
        channelTitle: "Google",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJXf7ZV0JSYp1wUp8Uz25FRkwH9PmS9IwGnknCvhO1g=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "ZRCdORJiUgU",
        title: "Google — Year in Search 2019",
        thumbnailUrl: "https://i.ytimg.com/vi/ZRCdORJiUgU/mqdefault.jpg",
        channelId: "UCK8sQmJBp8GCxrOtXWBpyEA",
        channelTitle: "Google",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJXf7ZV0JSYp1wUp8Uz25FRkwH9PmS9IwGnknCvhO1g=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "6aFdEhEZQjE",
        title: "Google — Year in Search 2018",
        thumbnailUrl: "https://i.ytimg.com/vi/6aFdEhEZQjE/mqdefault.jpg",
        channelId: "UCK8sQmJBp8GCxrOtXWBpyEA",
        channelTitle: "Google",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJXf7ZV0JSYp1wUp8Uz25FRkwH9PmS9IwGnknCvhO1g=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "vI4LHl4yFuo",
        title: "Google — Year in Search 2017",
        thumbnailUrl: "https://i.ytimg.com/vi/vI4LHl4yFuo/mqdefault.jpg",
        channelId: "UCK8sQmJBp8GCxrOtXWBpyEA",
        channelTitle: "Google",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJXf7ZV0JSYp1wUp8Uz25FRkwH9PmS9IwGnknCvhO1g=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "przDcQe6n5o",
        title: "EP000: Operation Aurora | HACKING GOOGLE",
        thumbnailUrl: "https://i.ytimg.com/vi/przDcQe6n5o/mqdefault.jpg",
        channelId: "UCK8sQmJBp8GCxrOtXWBpyEA",
        channelTitle: "Google",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/ytc/AL5GRJXf7ZV0JSYp1wUp8Uz25FRkwH9PmS9IwGnknCvhO1g=s240-c-k-c0x00ffffff-no-rj",
      },
    ],
  },
  {
    categoryName: "WeArePlay",
    categoryLinks: [
      {
        videoId: "r8Z641JpFpQ",
        title: "#WeArePlay | Anica & Kristijan  | Dub Studio | Croatia",
        thumbnailUrl: "https://i.ytimg.com/vi/r8Z641JpFpQ/mqdefault.jpg",
        channelId: "UCVHFbqXqoYvEWM1Ddxl0QDg",
        channelTitle: "Android Developers",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/OWAcq1Yu0stdx87oWaZNPMLWYhAyrGhmDTPyi13jlmfAGkkLO5RgYnLGoaXqG_ZOWXCiuqKk=s240-c-k-c0x00ffffff-no-rj",
      },
      {
        videoId: "-a4I9Vg-QLg",
        title: "#WeArePlay | Melissa  | BringFido | USA",
        thumbnailUrl: "https://i.ytimg.com/vi/-a4I9Vg-QLg/mqdefault.jpg",
        channelId: "UCVHFbqXqoYvEWM1Ddxl0QDg",
        channelTitle: "Android Developers",
        channelThumbnailUrl:
          "https://yt3.ggpht.com/OWAcq1Yu0stdx87oWaZNPMLWYhAyrGhmDTPyi13jlmfAGkkLO5RgYnLGoaXqG_ZOWXCiuqKk=s240-c-k-c0x00ffffff-no-rj",
      },
    ],
  },
];
