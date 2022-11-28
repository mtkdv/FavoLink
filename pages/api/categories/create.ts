import { addCategory } from "#/lib/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postData = await JSON.parse(req.body);
  // const response = await addCategory(postData);
  // res.status(200).json({ response });
  // await addCategory(postData);
  // res.status(200).json({ message: "POST" });
  // await addCategory(postData);
  // res.status(200).end();
}
