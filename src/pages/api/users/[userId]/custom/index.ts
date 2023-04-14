import { Custom, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import prisma from "#/lib/prisma";
import { authOptions } from "#/pages/api/auth/[...nextauth]";
import { CustomFormData } from "#/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<(Custom | null) | { code: string; message: string }>
  // res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ code: "401", message: "You must be logged in." });
    return;
  }

  const { id } = session.user!;
  const userId = req.query.userId as string;

  if (id !== userId) {
    res.status(403).json({ code: "403", message: "You are not authorized." });
    return;
  }

  switch (req.method) {
    case "GET": {
      try {
        const custom = await prisma.custom.findUniqueOrThrow({
          where: { userId },
        });
        res.json(custom);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("error.code:", error.code);
          res.status(404).json({ code: error.code, message: error.message });
        }
      }
      break;
    }

    case "PATCH": {
      const { backgroundImage, mode } = req.body as CustomFormData;

      try {
        const custom = await prisma.custom.update({
          where: { userId },
          data: {
            backgroundImage,
            mode,
          },
        });
        res.json(custom);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("error.code:", error.code);
          res.status(404).json({ code: error.code, message: error.message });
        }
      }
      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
