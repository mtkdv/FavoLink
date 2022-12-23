import { uploadAndGetUrl } from "#/lib/firebaseStorage";
import prisma from "#/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/profile
// Required fields in body: slug, image, name, description
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

  switch (req.method) {
    case "GET": {
      try {
        const profile = await prisma.profile.findUniqueOrThrow({
          where: {
            userId: id,
          },
        });
        res.json(profile);
      } catch (error) {}
      break;
    }
    case "PUT": {
      const { slug, image, name, description } = req.body;
      // const { slug, fileList, name, description } = req.body;

      // let image;
      // if (fileList?.[0]) {
      //   image = await uploadAndGetUrl(fileList?.[0]);
      // }

      const profile = await prisma.profile.update({
        where: { userId: id },
        data: {
          name,
          image,
          slug,
          description,
        },
      });
      res.json(profile);
    }
  }
}
