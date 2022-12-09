import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/profile
// Required fields in body: id, email, name, image
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  switch (req.method) {
    case "GET": {
      try {
        const foundProfile = await prisma.profile.findUniqueOrThrow({
          where: {
            userId: session.user?.id,
          },
        });
        res.json(foundProfile);
      } catch (error) {}
      break;
    }
    // case "POST":
    //   const { id, name, image } = req.body;
    //   console.log("/api/profile");
    //   const result = await prisma.profile.create({
    //     data: {
    //       name,
    //       image,
    //       user: { connect: { id } },
    //     },
    //   });
    //   res.json(result);
    //   break;
  }
}
