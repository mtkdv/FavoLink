import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Custom } from "@prisma/client";

export const useGetCustom = () => {
  const { data: session } = useSession();

  return useQuery<Custom, AxiosError>({
    queryKey: ["GetCustom"],
    queryFn: async () => {
      const res = await axios.get(`/api/users/${session!.user!.id}/custom`);

      // Loading Test
      // await new Promise((r) => setTimeout(r, 3000));

      return res.data;
    },
    enabled: !!session && !!session.user,
    useErrorBoundary: true,
  });
};
