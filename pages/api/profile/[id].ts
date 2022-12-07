import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  switch (req.method) {
    case "GET":
      const foundProfile = await prisma.profile.findUniqueOrThrow({
        where: {
          // TODO:
          userId: String(id),
        },
        select: {
          name: true,
          image: true,
          slug: true,
          description: true,
        },
      });
      res.json(foundProfile);
      break;
    case "PUT":
      const updatedProfile = await prisma.profile.update({
        where: { userId: String(id) },
        data: req.body,
      });
      res.json(updatedProfile);
  }
}
