import type { NextApiRequest, NextApiResponse } from "next";
import { Category, Custom, Link, Profile } from "@prisma/client";

import prisma from "#/lib/prisma";

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

  try {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        // slug: String(slug),
        slug,
      },
    });

    if (profile.published === false) {
      throw new Error("This page is not publisled");
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
      prisma.custom.findUniqueOrThrow({
        where: {
          userId: profile.userId,
        },
      });

    const [categories, videos, custom] = await Promise.all([
      findCategories(),
      findLinks(),
      findCustom(),
    ]);

    res.json({ profile, categories, videos, custom });
  } catch (error: any) {
    // FIXME:
    res.status(404).json({ message: error.message });
  }
}
