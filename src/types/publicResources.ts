import { Custom, Profile } from "@prisma/client";
import { Videos } from "#/types/video";

export type PublicResources = {
  profile: Profile;
  custom: Custom;
  videos: Videos;
};
