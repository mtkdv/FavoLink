import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { Session } from "next-auth";

export const useGetProfile = (session: Session | null) => {
  const profile = useQuery<Profile, { message: string }>({
    queryKey: ["profile"],
    queryFn: async () => {
      // try {
      const res = await axios.get<Profile>(`/api/profiles`, {
        params: {
          type: "getProfile",
          id: session!.user!.id,
          // id: "cld3xv2kq0000ie3g26vfe6cb",
        },
      });
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 3000);
      // });
      // console.log("useGetProfile res", res);
      return res.data;
      // } catch (error) {
      //   if (isAxiosError(error)) {
      //     throw new Error(error.response?.data.message);
      //   }
      // }
    },
    enabled: !!session && !!session.user,
  });
  return profile;
};
