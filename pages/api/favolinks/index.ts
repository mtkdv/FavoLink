import { fetchFavolinks } from "#/lib/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetchFavolinks();
  res.status(200).json(response);
}
