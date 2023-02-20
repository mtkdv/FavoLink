import type { NextApiRequest, NextApiResponse } from "next";
import { Custom, Mode, Prisma } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import prisma from "#/lib/prisma";

/** /api/custom/ */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<(Custom | null) | { code: string; message: string }>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ code: "401", message: "You must be logged in." });
    return;
  }

  const { id } = session.user!;
  const { type, id: userId } = req.query as { type: string; id: string };

  if (id !== userId) {
    res.status(403).json({ code: "403", message: "You are not authorized 5." });
    return;
  }

  switch (type) {
    case "getCustom": {
      try {
        const custom = await prisma.custom.findUnique({
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

    case "mutateCustom": {
      const { backgroundImage, mode } = req.body as {
        backgroundImage: string | undefined;
        mode: Mode | undefined;
      };

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

    // default: {
    //   res.status(405).json({ code })
    // }
  }
}
