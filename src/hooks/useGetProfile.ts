import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { Session } from "next-auth";

export const useGetProfile = (
  session: Session | null
  // select?: Record<keyof Profile, boolean>
) => {
  // const profile = useQuery<Profile, { message: string }>({
  const profile = useQuery<
    Profile,
    AxiosError<{ message: string }>
    // Pick<Profile, keyof typeof select>
  >({
    queryKey: ["profile"],
    queryFn: async () => {
      // if (select) {
      // const res = await axios.get<Pick<Profile, keyof typeof select>>(
      //   `/api/profile`,
      //   {
      //     params: {
      //       type: "getProfile",
      //       id: session!.user!.id,
      //       select,
      //     },
      //   }
      // );
      // return res.data;
      // } else {
      // const res = await axios.get<Profile>(`/api/profile`, {
      const res = await axios.get<Profile>(
        `/api/profile`,
        // レスポンスなしエラーを発生させる。
        // `http://localhost:1234/api/profile`,
        {
          params: {
            type: "getProfile",
            // レスポンスありエラーを発生させる。
            // type: "getProfileaaaa",
            id: session!.user!.id,
            // id: "cld3xv2kq0000ie3g26vfe6cb",
          },
        }
      );

      // Loading Test
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      return res.data;
      // }
    },
    enabled: !!session && !!session.user,
    useErrorBoundary: true,
  });
  return profile;
};
