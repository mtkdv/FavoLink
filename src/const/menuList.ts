import { IconKeys } from "#/components/pages/home/DropDownItem";
import { pagesInfo } from "#/const/pagesInfo";
import { github } from "#/const/staticData";

export type MenuList = MenuItem[];

export type MenuItem = {
  title: "Dashboard" | "Contact" | "Legal";
  items: Item[];
};

export type Item = {
  title: {
    en: string;
  };
  href: string;
  icon?: IconKeys;
  // icon?: string;
};

export const menuList: MenuList = [
  {
    title: "Dashboard",
    items: [
      pagesInfo.my.profile,
      pagesInfo.my.addVideo,
      pagesInfo.my.customize,
      pagesInfo.my.preview,
    ],
  },
  {
    title: "Contact",
    items: [pagesInfo.contact, github],
  },
  {
    title: "Legal",
    items: [pagesInfo.terms, pagesInfo.privacyPolicy],
  },
];
