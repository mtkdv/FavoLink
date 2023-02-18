import { Custom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";

export const useGetCustom = (session: Session | null) => {
  const custom = useQuery<any, { code: string; message: string }, Custom>({
    queryKey: ["custom"],
    queryFn: async () => {
      const res = await axios.get<Custom>(`/api/custom`, {
        params: {
          type: "getCustom",
          id: session!.user!.id,
        },
      });
      return res.data;
    },
    enabled: !!session && !!session.user,
  });
  return custom;
};
