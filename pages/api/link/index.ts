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
      const { videoId, categoryId } = req.body.data;

      // youtube
      // TODO: 回数制限
      const data = await listVideos(videoId);
      if (data!.items.length == 0) {
        res.json({
          message: "動画を取得できませんでした",
        });
        return;
      }

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
          title: data!.items[0].snippet.title,
          videoId,
          thumbnailUrl: data!.items[0].snippet.thumbnails.medium.url,
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
