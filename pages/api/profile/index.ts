import { fetchProfile } from "#/lib/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetchProfile();
  // console.log({ response });
  // {
  //   response: [
  //     { title: '美味しんぼ', index: 0 },
  //     { index: 1, title: 'ホロEN' },
  //     { title: 'スバおか', index: 2 },
  //     { title: 'スバルーナ', index: 3 },
  //     { index: 4, title: 'ホロライブ' }
  //   ]
  // }
  // res.status(200).json({ response });
  res.status(200).json(response);
}
