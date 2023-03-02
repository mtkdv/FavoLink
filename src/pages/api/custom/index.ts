import type { NextApiRequest, NextApiResponse } from "next";
import { Custom, Mode, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import prisma from "#/lib/prisma";

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
  const { type, id: userId } = req.query as { type: string; id: string };

  if (id !== userId) {
    res.status(403).json({ code: "403", message: "You are not authorized." });
    return;
  }

  switch (type) {
    case "getCustom": {
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
        // console.log("error:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("error.code:", error.code);
          res.status(404).json({ code: error.code, message: error.message });
        }
      }
      break;
    }

    default:
      // res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Action type ${type} Not Allowed`);
  }
}
