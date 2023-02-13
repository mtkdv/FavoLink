import { IconKeys } from "#/components/uiParts/LinkWithIcon";

export const MENU_LIST: {
  title: string;
  href: string;
  icon: IconKeys;
}[] = [
  {
    title: "Top Page",
    href: "/",
    icon: "RiHomeSmileFill",
  },
  {
    title: "Dashboard",
    href: "/my/dashboard",
    icon: "RiDashboardFill",
  },
  {
    title: "Profile",
    href: "/my/profile",
    icon: "RiUser5Fill",
  },
  {
    title: "Add Video",
    href: "/my/add-video",
    icon: "IoLogoYoutube",
  },
  {
    title: "Customize",
    href: "/my/customize",
    icon: "RiMagicFill",
  },
  {
    title: "Preview",
    href: "/my/preview",
    icon: "FaEye",
  },
];
