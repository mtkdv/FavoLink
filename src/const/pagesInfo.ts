export const pagesInfo = {
  contact: {
    title: {
      en: "Contact",
    },
    href: "/contact",
    icon: "GrMail",
  },
  my: {
    dashboard: {
      title: {
        en: "Dashboard",
      },
      href: "/my/dashboard",
      icon: "RiDashboardFill",
    },
    profile: {
      key: "profile",
      title: {
        en: "Profile",
        ja: "プロフィール編集",
      },
      href: "/my/profile",
      icon: "RiUser5Fill",
    },
    addVideo: {
      key: "addVideo",
      title: {
        en: "Add Video",
        ja: "動画リスト編集",
      },
      href: "/my/add-video",
      icon: "IoLogoYoutube",
    },
    customize: {
      key: "customize",
      title: {
        en: "Customize",
        ja: "カスタマイズ",
      },
      href: "/my/customize",
      icon: "RiMagicFill",
    },
    preview: {
      title: {
        en: "Preview",
      },
      href: "/my/preview",
      icon: "FaEye",
    },
  },
  privacyPolicy: {
    title: { en: "Privacy Policy" },
    href: "/privacy-policy",
  },
  terms: {
    title: { en: "Terms" },
    href: "/terms",
  },
  user: {
    href: "/user/",
  },
  top: {
    title: { en: "Top" },
    href: "/",
    icon: "RiHomeSmileFill",
  },
} as const;

export type PagesPath = FlattenObjectValues<typeof pagesInfo>;

type FlattenObjectValues<T> = T extends PageInfo
  ? T["href"]
  : { [K in keyof T]: FlattenObjectValues<T[K]> }[keyof T];

type PageInfo = {
  key?: string;
  title?: {
    en?: string;
    ja?: string;
  };
  href: string;
  icon?: string;
};

// FIXME: "my"
// 現在不使用。
export const getPagesPath = ([segment1, segment2]:
  | [keyof Omit<typeof pagesInfo, "my">]
  | ["my", keyof typeof pagesInfo["my"]]): PagesPath => {
  return segment1 === "my"
    ? pagesInfo[segment1][segment2].href
    : pagesInfo[segment1].href;
};
