import { User } from "#/store/store";
import { useQuery } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
};

export const useGetCategories = (user: User) => {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`/api/category/${user.uid}`);
      return (await res.json()) as Category[];
    },
    enabled: !!user,
  });
  return categories;
};

// getServerSession
// const { data: categories, isLoading } = useQuery({
//   queryKey: ["categories"],
//   queryFn: () => fetchCategories(),
// });
