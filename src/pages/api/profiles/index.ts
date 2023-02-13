import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/** /api/profiles/[userId] */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    // console.log("!session:");
    res.status(401).json({ code: 401, message: "You must be logged in." });
    return;
  }

  const { id } = session.user!;
  // const { userId } = req.query as { userId: string };
  const { type, id: userId } = req.query as { type: string; id: string };

  // console.log(req.query);
  // => { type: 'patchProfile', id: 'cld3xv2kq0000ie3g26vfe6cb' }
  // console.log("type:", type);
  // console.log("serverSessionId:", id);
  // console.log("clientSessionId:", userId);
  // return;
  // console.log("id !== userId:", id !== userId);

  if (id !== userId) {
    console.log("id !== userId");
    res.status(403).json({ code: 403, message: "You are not authorized 5." });
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
            published,
          },
        });
        res.json(profile);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          res.json({ message: error.message });
        } else {
          console.error(error);
          // FIXME: as string
          res.json({ message: error as string });
        }
      }
      break;
    }
  }
}
