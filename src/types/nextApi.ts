import { NextApiRequest } from "next";

export type ReqQuery = {
  userId: string;
  [key: string]: string;
};

export type NextApiRequestWithReqQuery = NextApiRequest & {
  query: ReqQuery;
};
