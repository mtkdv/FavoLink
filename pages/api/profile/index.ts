import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/profile
// Required fields in body: id, email, name, image
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, image } = req.body;
  console.log("/api/profile");
  const result = await prisma.user.create({
    data: {
      ...req.body,
      profile: {
        create: {
          id,
          name,
          image,
        },
      },
    },
  });
  res.json(result);
}
