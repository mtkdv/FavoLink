import { Link } from "@prisma/client";

export type Videos = {
  categoryId: string;
  categoryName: string;
  categoryLinks: Link[];
}[];
