import { useEffect, useState } from "react";

import { Schema } from "#/pages/my/add-video";
import { Videos } from "#/types";

export const useFormatData = (videos: Videos | undefined) => {
  const [values, setValues] = useState<Schema>();

  useEffect(() => {
    if (!videos) return;
    setValues({ videos });
  }, [videos]);

  return values;
};
