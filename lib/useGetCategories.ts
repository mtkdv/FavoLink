import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

export const useGetCategories = (session: Session | null) => {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`/api/category`);
      return (await res.json()) as Category[];
    },
    enabled: !!session,
  });
  return categories;
};
