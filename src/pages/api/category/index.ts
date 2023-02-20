import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { id } = session.user!;

  switch (req.method) {
    case "GET": {
      const categories = await prisma.category.findMany({
        where: {
          userId: id,
        },
        orderBy: {
          index: "asc",
        },
      });
      // console.log("apiCategoryGetResponse:", categories);
      res.json(categories);
      break;
    }
    case "POST": {
      const { category: name } = req.body.data;

      // 上限数チェック
      const categories = await prisma.category.findMany({
        where: {
          userId: id,
        },
        select: {
          name: true,
        },
      });
      if (categories.length === 5) {
        res.json({
          type: "maxLimit",
          message: "登録できるカテゴリーは5つまでです。",
        });
        return;
      }

      // 重複チェック
      const isDuplicated = categories.some(
        (category) => category.name === name
      );
      if (isDuplicated) {
        res.json({
          type: "duplicated",
          message: `カテゴリー『${name}』はすでに登録されています。`,
        });
        return;
      }

      const aggregation = await prisma.category.aggregate({
        where: {
          userId: id,
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

      const category = await prisma.category.create({
        data: {
          name,
          index,
          user: {
            connect: { id },
          },
        },
      });
      res.json({
        type: "success",
        message: `カテゴリー ${category.name} を追加しました`,
      });
      break;
    }
  }
}
