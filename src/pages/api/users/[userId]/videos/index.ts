import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import prisma from "#/lib/prisma";
import { authOptions } from "#/pages/api/auth/[...nextauth]";
import { Schema } from "#/pages/my/add-video";
import { generateVideos } from "#/utils";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    res.status(401).json({ code: "401", message: "You must be logged in." });
    return;
  }

  const { id } = session.user;
  const userId = req.query.userId as string;

  if (id !== userId) {
    res.status(403).json({ code: "403", message: "You are not authorized." });
    return;
  }

  switch (req.method) {
    case "GET": {
      try {
        const findCategories = () =>
          prisma.category.findMany({
            where: { userId },
            orderBy: {
              index: "asc",
            },
          });
        const findLinks = () =>
          prisma.link.findMany({
            where: { userId },
            orderBy: {
              index: "asc",
            },
          });

        const [categories, links] = await Promise.all([
          findCategories(),
          findLinks(),
        ]);

        const videos = generateVideos({ categories, links });
        res.json(videos);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("GetProfile error", error);
          res.status(404).json({ message: error.message });
        }
      }
      break;
    }

    // FIXME: try/catch
    case "PUT": {
      const { videos } = req.body as Schema;

      /** Delete Category */
      const inputCategories = videos.map(({ categoryId }) => categoryId);

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
      const inputVideos = videos.flatMap(({ categoryLinks }) => {
        return categoryLinks.map(({ id }) => id);
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
        videos.flatMap(
          async ({ categoryId, categoryName: name, categoryLinks }, ci) => {
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
              categoryLinks.flatMap(
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

    default:
      res.status(405).end();
      break;
  }
}
