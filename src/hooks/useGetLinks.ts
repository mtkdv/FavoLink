import { Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

export const useGetLinks = (session: Session | null) => {
  const links = useQuery({
    queryKey: ["youtube", "links"],
    queryFn: async () => {
      const res = await fetch(`/api/link`);
      return (await res.json()) as Link[];
    },
    enabled: !!session,
  });
  return links;
};
