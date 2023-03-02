import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";

import prisma from "#/lib/prisma";
import { authOptions } from "#/pages/api/auth/[...nextauth]";

/** /api/profile */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ code: 401, message: "You must be logged in." });
    return;
  }

  const { id } = session.user!;
  const { type, id: userId } = req.query as { type: string; id: string };

  if (id !== userId) {
    res.status(403).json({ code: 403, message: "You are not authorized." });
    return;
  }

  switch (type) {
    case "getProfile": {
      try {
        const profile = await prisma.profile.findUniqueOrThrow({
          where: { userId },
          // where: { userId: "hogehoge" },
        });
        res.json(profile);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("getProfile, error", error);
          res.status(404).json({ message: error.message });
        }
      }
      break;
    }

    case "validateSlug": {
      const { slug } = req.query as { slug: string };
      try {
        const existingProfile = await prisma.profile.findUnique({
          where: { slug },
        });

        if (existingProfile) {
          res.status(409).json({ message: "Slug already exists" });
          return;
        }

        res.status(200).json({ message: "OK" });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("getProfile, error", error);
          res.status(404).json({ message: error.message });
        }
      }
      break;
    }

    case "mutateProfile": {
      const { slug, image, name, description } = req.body;
      // console.log("image:", image); //=> undefined
      // https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
      try {
        const profile = await prisma.profile.update({
          where: { userId },
          data: {
            name,
            image,
            slug,
            description,
          },
        });
        res.json(profile);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("error.code:", error.code);
          res.status(404).json({ code: error.code, message: error.message });
        }
      }
      break;
    }

    case "changePublished": {
      const { published } = req.body;
      try {
        const profile = await prisma.profile.update({
          where: { userId },
          data: {
            published,
          },
        });
        res.json(profile);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          res.json({ message: error.message });
        } else {
          console.error(error);
          // FIXME: as string
          res.json({ message: error as string });
        }
      }
      break;
    }

    default:
      // res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Action type ${type} Not Allowed`);
  }
}
