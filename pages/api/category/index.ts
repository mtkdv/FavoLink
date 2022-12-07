import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // switch (req.method) {
  // case "GET":
  const aggregation = await prisma.category.aggregate({
    where: {
      userId: req.body.userId,
    },
    _count: {
      _all: true,
    },
    _max: {
      index: true,
    },
  });
  // console.log("aggregation:", aggregation);
  //=> 0, null
  //=> 1, 1024
  // TODO: 定数
  const index =
    aggregation._count._all === 0 ? 1024 : aggregation._max.index! + 1024;
  const foundProfile = await prisma.category.create({
    data: {
      name: req.body.name,
      index,
      user: {
        connect: {
          id: req.body.userId,
        },
      },
    },
  });
  res.json(foundProfile);
  //   break;
  // case "PUT":
  //   const updatedProfile = await prisma.profile.update({
  //     where: { userId: String(id) },
  //     data: req.body,
  //   });
  //   res.json(updatedProfile);
  // }
}
