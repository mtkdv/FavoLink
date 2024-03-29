import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";

import prisma from "#/lib/prisma";
import { authOptions } from "#/pages/api/auth/[...nextauth]";
import { RequestPathParameters } from "#/schema/api";

import type { NextApiRequest, NextApiResponse } from "next";

const RequestBody = z.object({
  published: z.boolean(),
});

// export type RequestBody = z.infer<typeof RequestBody>;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    res.status(401).json({ code: 401, message: "You must be logged in." });
    return;
  }

  const { id } = session.user;
  const { userId } = RequestPathParameters.parse(req.query);

  if (id !== userId) {
    res.status(403).json({ code: 403, message: "You are not authorized." });
    return;
  }

  switch (req.method) {
    case "GET": {
      try {
        const profile = await prisma.profile.findUniqueOrThrow({
          where: { userId },
          select: {
            published: true,
          },
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

    case "PATCH": {
      const { published } = RequestBody.parse(req.body);

      try {
        const profile = await prisma.profile.update({
          where: { userId },
          data: { published },
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

    default:
      res.status(405).end();
      break;
  }
}
