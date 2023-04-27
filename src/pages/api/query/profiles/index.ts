import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import prisma from "#/lib/prisma";
import { authOptions } from "#/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

// Slug重複検証
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ code: 401, message: "You must be logged in." });
    return;
  }

  switch (req.method) {
    case "GET": {
      const slug = req.query.slug as string;
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

    default:
      res.status(405).end();
      break;
  }
}
