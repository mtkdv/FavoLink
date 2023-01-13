import prisma from "#/lib/prisma";
import { listVideos } from "#/lib/youtube";
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

      // 上限数チェック
      const links = await prisma.link.findMany({
        where: {
          userId: id,
          categoryId,
        },
        select: {
          videoId: true,
        },
      });
      if (links.length === 5) {
        res.json({
          type: "error",
          message: "一つのカテゴリーに登録できる動画は5つまでです",
        });
        return;
      }

      // 重複チェック
      const isDuplicated = links.some((link) => link.videoId === videoId);
      if (isDuplicated) {
        res.json({
          type: "error",
          message: "このカテゴリー内にその動画はすでに登録されています",
        });
        return;
      }

      /** YouTube */
      // TODO: 回数制限
      const videoData = await listVideos(videoId);
      if (videoData.type === "error") {
        const { code, message } = videoData;
        // res.json({ code, message });
        res.json({ type: code, message });
        return;
      }
      const { title, thumbnailUrl } = videoData;

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
          title,
          videoId,
          thumbnailUrl,
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
      // res.json(createdLink);
      res.json({
        type: "success",
        message: "動画を追加しました",
      });
      break;
    }
  }
}
