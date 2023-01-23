import prisma from "#/lib/prisma";
import { Category, Link, Profile } from "@prisma/client";
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

export default async function PublicPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  try {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        slug: String(slug),
      },
    });

    if (profile.published === false) {
      throw new Error("error");
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

    const [categories, links] = await Promise.all([
      findCategories(),
      findLinks(),
    ]);

    res.json({ type: "success", profile, categories, links });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.json({ type: "error", message: error.message });
      return;
    } else {
      console.error(error);
      // TODO: as string
      res.json({ type: "error", message: error as string });
      return;
    }
  }
}
