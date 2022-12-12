import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
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

    res.json({ profile, categories, links });
  } catch (error) {}
}
