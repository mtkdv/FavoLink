export const topInfo = {
  heading: "好きな動画で自己紹介",
  paragraph:
    "あなたの好きな YouTube 動画を集めた、あなただけのプロフィールを作成できます。",
  login: "Login",
  createPage: "ページを作成",
  features: [
    {
      headings: ["動画を登録して", "プロフィールを作成"],
      image: "feature1" as const,
    },
    {
      headings: ["カテゴリー別に", "動画を登録"],
      paragraphs: [
        "カテゴリーは５つ、",
        "動画はカテゴリーごとに６つまで登録可能",
      ],
      reverse: true,
      image: "feature2" as const,
    },
    {
      headings: ["気になった動画は", "その場で再生"],
      image: "feature3" as const,
    },
  ],
  customize: {
    heading: "カスタマイズ",
    paragraphs: [
      "背景を自由に設定することができます。",
      "背景に合わせてライトモード、ダークモードを選択できます。",
    ],
  },
};

export type TopFeature = typeof topInfo.features[number];
