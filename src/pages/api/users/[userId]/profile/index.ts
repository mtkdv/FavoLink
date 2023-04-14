import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import prisma from "#/lib/prisma";
import { authOptions } from "#/pages/api/auth/[...nextauth]";
import { NextApiRequestWithReqQuery } from "#/types";
import { deserializeQueryParams } from "#/utils";

import type { NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequestWithReqQuery,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ code: 401, message: "You must be logged in." });
    return;
  }

  const { id } = session.user!;
  const { userId, select } = deserializeQueryParams(req.query);

  if (id !== userId) {
    res.status(403).json({ code: 403, message: "You are not authorized." });
    return;
  }

  switch (req.method) {
    case "GET": {
      try {
        const profile = await prisma.profile.findUniqueOrThrow({
          where: { userId },
          select,
        });
        res.json(profile);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("GetProfile error", error);
          res.status(404).json({ message: error.message });
        }
      }
      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
