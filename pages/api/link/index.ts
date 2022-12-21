import prisma from "#/lib/prisma";
import { getYouTubeVideoIdFromUrl, listVideos } from "#/lib/youtube";
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
      const links = await prisma.link.findMany({
        where: {
          userId: id,
        },
        orderBy: {
          index: "asc",
        },
      });
      res.json(links);
      break;
    }
    case "POST": {
      const { url, categoryId } = req.body;

      const videoId = getYouTubeVideoIdFromUrl(url);
      if (!videoId) return;

      // 同一のカテゴリ内でurlが重複する場合
      // const link = await prisma.link.findFirst({
      //   where: req.body,
      // });
      // if (link) {
      //   res.status(500).send({
      //     error: "特定のカテゴリ内に同一のリンクを登録しようとしています。",
      //   });
      //   return;
      // }

      // youtube
      // TODO: 回数制限
      const video = await listVideos(videoId);
      if (!video) throw new Error();

      const aggregation = await prisma.link.aggregate({
        where: {
          userId: id,
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
          videoId,
          thumbnailUrl: video.thumbnails.medium.url,
          index,
          user: {
            connect: { id },
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
