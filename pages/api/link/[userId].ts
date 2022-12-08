import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId;

  switch (req.method) {
    case "GET":
      const links = await prisma.link.findMany({
        where: {
          // TODO:
          userId: String(userId),
        },
        orderBy: {
          index: "asc",
        },
      });
      res.json(links);
      break;
    // case "PUT":
    //   const updatedProfile = await prisma.profile.update({
    //     where: { userId: String(id) },
    //     data: req.body,
    //   });
    //   res.json(updatedProfile);
  }
}
