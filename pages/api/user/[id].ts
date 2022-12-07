import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/user/[id]
// Required fields in body: id, name, image
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  // console.log("req.query.id: ", req.query.id);
  // const result = await prisma.user.findUniqueOrThrow({
  const result = await prisma.profile.findUnique({
    where: {
      // TODO:
      userId: String(id),
    },
    select: {
      name: true,
      image: true,
      slug: true,
      description: true,
    },
  });
  // console.log(result);
  res.json(result);
}
