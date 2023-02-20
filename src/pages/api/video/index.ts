import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import prisma from "#/lib/prisma";
import { Schema } from "#/pages/my/add-video";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { id: userId } = session.user!;

  switch (req.method) {
    case "PUT": {
      const { youtube } = req.body as Schema;

      /** Delete Category */
      const inputCategories = youtube.map(({ categoryId }) => categoryId);

      const dataCategories = await prisma.category.findMany({
        where: { userId },
        select: {
          id: true,
        },
      });

      const deleteCategories = dataCategories.flatMap(({ id }) => {
        if (inputCategories.indexOf(id) === -1) return id;
        return [];
      });

      await prisma.category.deleteMany({
        where: {
          id: { in: deleteCategories },
        },
      });

      /** Delete Video */
      const inputVideos = youtube.flatMap(({ video }) => {
        return video.map(({ id }) => id);
      });

      const dataVideos = await prisma.link.findMany({
        where: { userId },
        select: {
          id: true,
        },
      });

      const deleteVideos = dataVideos.flatMap(({ id }) => {
        if (inputVideos.indexOf(id) === -1) return id;
        return [];
      });

      await prisma.link.deleteMany({
        where: {
          id: { in: deleteVideos },
        },
      });

      /** Upsert Category & Video */
      const response = await Promise.all(
        youtube.flatMap(
          async ({ categoryId, categoryName: name, video }, ci) => {
            if (name === "") return [];
            // FIXME: index処理不要かも
            const index = (ci + 1) * 1024;
            const upsertedCategory = await prisma.category.upsert({
              where: { id: categoryId },
              update: { name, index },
              create: {
                name,
                index,
                user: {
                  // FIXME: とりあえずgetServerSessionの値を使用
                  connect: { id: userId },
                },
              },
            });

            const upsertedVideo = await Promise.all(
              video.flatMap(
                async (
                  {
                    id,
                    videoId,
                    title,
                    thumbnailUrl,
                    channelId,
                    channelTitle,
                    channelThumbnailUrl,
                  },
                  vi
                ) => {
                  if (videoId === "") return [];
                  const index = (vi + 1) * 1024;
                  return await prisma.link.upsert({
                    where: { id },
                    update: { index },
                    create: {
                      title,
                      videoId,
                      thumbnailUrl,
                      channelId,
                      channelTitle,
                      channelThumbnailUrl,
                      index,
                      user: {
                        connect: { id: userId },
                      },
                      category: {
                        // カテゴリ作成時にはcategoryIdはまだ無いため。
                        connect: { id: upsertedCategory.id },
                      },
                    },
                  });
                }
              )
            );

            return { upsertedCategory, upsertedVideo };
          }
        )
      );
      // console.log("response:", response);
      // res.json({ type: "success", response });
      res.json(response);
      break;
    }
  }
}
