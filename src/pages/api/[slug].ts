import prisma from "#/lib/prisma";
import { Category, Custom, Link, Profile } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export type PublicPageRes =
  | {
      type: "success";
      profile: Profile;
      categories: Category[];
      links: Link[];
    }
  | {
      type: "error";
      message: string;
    };

export type PublicPageData = {
  profile: Profile;
  categories: Category[];
  videos: Link[];
  custom: Custom;
};

export default async function PublicPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { slug } = req.query;
  const slug = req.query.slug as string;
  // console.log("slug:", slug);

  // try {
  const profile = await prisma.profile.findUniqueOrThrow({
    where: {
      // slug: String(slug),
      slug,
    },
  });

  if (profile.published === false) {
    // FIXME: res.status().json()
    throw new Error("publisled field is false");
  }

  const findCategories = () =>
    prisma.category.findMany({
      where: {
        userId: profile.userId,
      },
      orderBy: {
        index: "asc",
      },
    });
  const findLinks = () =>
    prisma.link.findMany({
      where: {
        userId: profile.userId,
      },
      orderBy: {
        index: "asc",
      },
    });
  const findCustom = () =>
    prisma.custom.findUnique({
      where: {
        userId: profile.userId,
      },
    });

  const [categories, videos, custom] = await Promise.all([
    findCategories(),
    findLinks(),
    findCustom(),
  ]);

  // res.json({ type: "success", profile, categories, links });
  res.json({ profile, categories, videos, custom });
  // } catch (error) {
  //   if (error instanceof Error) {
  //     console.error(error);
  //     res.json({ type: "error", message: error.message });
  //     return;
  //   } else {
  //     console.error(error);
  //     // TODO: as string
  //     res.json({ type: "error", message: error as string });
  //     return;
  //   }
  // }
}
