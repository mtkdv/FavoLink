import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // NextAuth getServerSession利用時
    // case "GET": {
    //   break;
    // }
    case "POST": {
      const { name, userId } = req.body;
      const aggregation = await prisma.category.aggregate({
        where: {
          userId,
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
          name,
          index,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      res.json(foundProfile);
      break;
    }
  }
}
