export const pagesPath = {
  top: "/",
  my: {
    dashboard: "/my/dashboard",
    profile: "/my/profile",
    addVideo: "/my/add-video",
    customize: "/my/customize",
    preview: "/my/preview",
  },
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  user: "/user/",
} as const;

type FlattenObjectValues<T> = T extends object
  ? { [K in keyof T]: FlattenObjectValues<T[K]> }[keyof T]
  : T;

export type PagesPath = FlattenObjectValues<typeof pagesPath>;
