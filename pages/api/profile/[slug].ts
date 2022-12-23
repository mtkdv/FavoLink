import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// GET /api/profile/[slug]
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

  const { slug } = req.query;

  switch (req.method) {
    case "GET": {
      try {
        const count = await prisma.profile.count({
          where: {
            slug: slug as string,
            userId: {
              not: id,
            },
          },
        });
        res.json(count);
      } catch (error) {}
      break;
    }
  }
}
