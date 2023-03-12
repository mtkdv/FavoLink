export const pagesInfo = {
  contact: {
    title: "Contact",
    href: "/contact",
    icon: "GrMail",
  },
  my: {
    dashboard: {
      title: "Dashboard",
      href: "/my/dashboard",
      icon: "RiDashboardFill",
    },
    profile: {
      title: "Profile",
      href: "/my/profile",
      icon: "RiUser5Fill",
    },
    addVideo: {
      title: "Add Video",
      href: "/my/add-video",
      icon: "IoLogoYoutube",
    },
    customize: {
      title: "Customize",
      href: "/my/customize",
      icon: "RiMagicFill",
    },
    preview: {
      title: "Preview",
      href: "/my/preview",
      icon: "FaEye",
    },
  },
  privacyPolicy: {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  terms: {
    title: "Terms",
    href: "/terms",
  },
  user: {
    href: "/user/",
  },
  top: {
    title: "Top",
    href: "/",
    icon: "RiHomeSmileFill",
  },
} as const;

export type PagesPath = FlattenObjectValues<typeof pagesInfo>;

type FlattenObjectValues<T> = T extends PageInfo
  ? T["href"]
  : { [K in keyof T]: FlattenObjectValues<T[K]> }[keyof T];

export type PageInfo = {
  title?: string;
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
