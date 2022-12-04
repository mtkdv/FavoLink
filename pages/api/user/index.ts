import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/user
// Required fields in body: id, name, image
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.user.create({ data: req.body });
  res.json(result);
}
