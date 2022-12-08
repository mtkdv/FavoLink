import prisma from "#/lib/prisma";
import { listVideos } from "#/lib/youtube";
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
      const { url, userId, categoryId } = req.body;

      // 同一のカテゴリ内でurlが重複する場合
      const link = await prisma.link.findFirst({
        where: req.body,
      });
      // TODO: toast
      if (link) {
        // console.log("distinguishing link");
        res.status(500).send({
          error: "特定のカテゴリ内に同一のリンクを登録しようとしています。",
        });
        return;
      }

      // youtube
      // TODO: 回数制限
      const video = await listVideos(url);
      if (!video) throw new Error();
      // console.log("video:", video);

      const aggregation = await prisma.link.aggregate({
        where: {
          userId,
          categoryId,
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

      const createdLink = await prisma.link.create({
        data: {
          title: video.title,
          url,
          thumbnailUrl: video.thumbnails.medium.url,
          // TODO:
          index,
          user: {
            connect: {
              id: userId,
            },
          },
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
      res.json(createdLink);
      break;
    }
  }
}
