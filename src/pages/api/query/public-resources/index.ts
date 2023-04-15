import { Prisma } from "@prisma/client";

import prisma from "#/lib/prisma";
import { generateVideos } from "#/utils";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function PublicResources(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string;

  switch (req.method) {
    case "GET": {
      try {
        const profile = await prisma.profile.findUniqueOrThrow({
          where: { slug },
        });

        const { userId } = profile;

        if (profile.published === false) {
          throw new Error("This page is not publisled");
        }

        const findCustom = () =>
          prisma.custom.findUniqueOrThrow({
            where: { userId },
          });
        const findCategories = () =>
          prisma.category.findMany({
            where: { userId },
            orderBy: {
              index: "asc",
            },
          });
        const findLinks = () =>
          prisma.link.findMany({
            where: { userId },
            orderBy: {
              index: "asc",
            },
          });

        const findAndGenerateVideos = async () => {
          const [categories, links] = await Promise.all([
            findCategories(),
            findLinks(),
          ]);

          return generateVideos({ categories, links });
        };

        const [custom, videos] = await Promise.all([
          findCustom(),
          findAndGenerateVideos(),
        ]);

        res.json({ profile, custom, videos });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("GetProfile error", error);
          res.status(404).json({ message: error.message });
        }
      }
      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
