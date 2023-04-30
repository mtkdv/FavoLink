import { ReqQuery } from "#/types";

export const deserializeQueryParams = (reqQuery: ReqQuery) => {
  // const output = {
  //   userId: reqQuery.userId,
  //   select: {} as Record<string, boolean>,
  // };

  // for (const key in reqQuery) {
  //   if (key.startsWith("select[")) {
  //     const value = reqQuery[key] === "true";
  //     const selectKey = key.substring(7, key.length - 1);
  //     output.select[selectKey] = value;
  //   }
  // }

  // return output;

  const output = {
    userId: reqQuery.userId,
  };

  const select: Record<string, boolean> = {};

  Object.keys(reqQuery).forEach((key) => {
    if (key.startsWith("select[")) {
      const value = reqQuery[key] === "true";
      const selectKey = key.substring(7, key.length - 1);
      select[selectKey] = value;
    }
  });

  if (Object.keys(select).length > 0) {
    return { ...output, select };
  } else {
    // return output;
    // FIXME: selectの型を絞り込めない。
    return { ...output, select: undefined };
  }
};
