export const queryKeys = {
  form: {
    addVideo: ["addVideo"],
    customize: ["customize"],
    profile: ["profile"],
  },
  getCustom: ["getCustom"],
  getProfile: ["getProfile"],
  getProfileBaseInfo: ["getProfileBaseInfo"],
  getProfilePublished: ["getProfilePublished"],
  listUserVideo: ["listUserVideo"],
  playVideoData: ["playVideoData"],
  publicResources: ["publicResources"],
  signInModal: ["signInModal"],
  videoPlayerModal: ["videoPlayerModal"],
} as const;

export type FormQueryKeys = keyof typeof queryKeys.form;
