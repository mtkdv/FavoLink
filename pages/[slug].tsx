import Image from "next/image";
import avatar2 from "#/public/avatar2.png";
import { CategorizedLink } from "#/components/CategorizedLink";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Category, Link, Profile } from "@prisma/client";
import axios from "axios";

const Public = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["public"],
    queryFn: async () => {
      const res = await axios.get(`/api/${router.query.slug}`);
      return (await res.data) as {
        profile: Profile;
        categories: Category[];
        links: Link[];
      };
    },
    enabled: !!Object.keys(router.query).length,
  });

  if (!data) return <p>loading...</p>;
  const { profile, categories, links } = data;

  return (
    <div>
      <section>
        <Image
          src={profile.image ?? avatar2}
          alt="avatar"
          width={40}
          height={40}
        ></Image>
        <p>{profile.name}</p>
        <p>{profile.description}</p>
      </section>
      <CategorizedLink categories={categories} links={links} />
    </div>
  );
};

export default Public;
