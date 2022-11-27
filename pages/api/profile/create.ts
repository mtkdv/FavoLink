import { addFavolink } from "#/lib/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postData = await JSON.parse(req.body);
  await addFavolink(postData);
  res.status(200).end();
}
