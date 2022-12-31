import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/** QueryProfiles GET /api/query/profiles */
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

  const { id: userId, slug } = req.query as { id: string; slug: string };

  switch (req.method) {
    case "GET": {
      try {
        const profiles = await prisma.profile.findMany({
          where: {
            slug,
            userId: {
              not: userId,
            },
          },
        });
        res.json(profiles);
      } catch (error) {}
      break;
    }
  }
}
