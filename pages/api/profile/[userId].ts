import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId;

  switch (req.method) {
    case "GET":
      const foundProfile = await prisma.profile.findUniqueOrThrow({
        where: {
          // TODO:
          userId: String(userId),
        },
        // select: {
        //   name: true,
        //   image: true,
        //   slug: true,
        //   description: true,
        // },
      });
      res.json(foundProfile);
      break;
    case "PUT":
      const updatedProfile = await prisma.profile.update({
        where: { userId: String(userId) },
        data: req.body,
      });
      res.json(updatedProfile);
  }
}
