import prisma from "#/lib/prisma";
import { Profile } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Error = {
  code: number;
  message: string;
};

type Data = Profile | Error;

/** /api/profiles/[userId] */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ code: 401, message: "You must be logged in." });
    return;
  }

  const { id } = session.user!;
  // const { userId } = req.query as { userId: string };
  const { type, id: userId } = req.query as { type: string; id: string };

  // console.log(req.query);
  // => { type: 'patchProfile', id: 'cld3xv2kq0000ie3g26vfe6cb' }
  // console.log("type:", type);
  // console.log("userId:", userId);
  // return;

  if (id !== userId) {
    res.status(403).json({ code: 403, message: "You are not authorized." });
    return;
  }

  switch (type) {
    case "getProfile": {
      try {
        const profile = await prisma.profile.findUniqueOrThrow({
          where: { userId },
        });
        res.json(profile);
      } catch (error) {}
      break;
    }
    case "patchProfile": {
      const { slug, image, name, description } = req.body;
      try {
        const profile = await prisma.profile.update({
          where: { userId },
          data: {
            name,
            image,
            slug,
            description,
          },
        });
        res.json(profile);
      } catch (error) {}
      break;
    }
    case "changePublished": {
      const { published } = req.body;
      try {
        const profile = await prisma.profile.update({
          where: { userId },
          data: {
            published: !published,
          },
        });
        res.json({ type: "success", profile });
      } catch (error) {}
      break;
    }
  }
}
