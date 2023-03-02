import { Custom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";

export const useGetCustom = (session: Session | null) => {
  // const custom = useQuery<any, AxiosError<{ message: string }>, Custom>({
  const custom = useQuery<Custom, AxiosError>({
    queryKey: ["custom"],
    queryFn: async () => {
      const res = await axios.get(`/api/custom`, {
        params: {
          type: "getCustom",
          id: session!.user!.id,
          // id: 123123123,
        },
      });

      // Loading Test
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      return res.data;
    },
    enabled: !!session && !!session.user,
    useErrorBoundary: true,
  });
  return custom;
};
