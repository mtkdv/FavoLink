import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

export const useGetCategories = (session: Session | null) => {
  const categories = useQuery({
    queryKey: ["youtube", "categories"],
    queryFn: async () => {
      const res = await fetch(`/api/category`);
      // console.log("useGetCategories");
      return (await res.json()) as Category[];
      // const resdata = (await res.json()) as Category[];
      // console.log("useGetCategory response:", resdata);
      // return resdata;
    },
    enabled: !!session,
    useErrorBoundary: true,
  });
  return categories;
};
