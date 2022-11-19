import { addCategory } from "#/lib/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postData = await JSON.parse(req.body);
  const response = await addCategory(postData);
  res.status(200).json({ response });
  // TODO: getではないのだから、以下のように、fetch元にJSONを返す必要はないのでは？要検証
  // await addCategory(postData);
  // res.status(200);
}
