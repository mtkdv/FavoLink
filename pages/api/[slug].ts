import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;

  try {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        slug: String(slug),
      },
    });

    const findUser = () =>
      prisma.user.findUniqueOrThrow({
        where: {
          id: profile.userId,
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

    const [user, categories, links] = await Promise.all([
      findUser(),
      findCategories(),
      findLinks(),
    ]);

    res.json({ user, profile, categories, links });
  } catch (error) {}
}
