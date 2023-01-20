import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement, useMemo } from "react";
import { AddFavolinkForm } from "#/components/pages/my/link/AddFavolinkForm";
import Image from "next/image";
import { CategoryForm } from "#/components/pages/my/link/CategoryForm";
import { useGetCategories } from "#/lib/useGetCategories";
import { useGetLinks } from "#/lib/useGetLinks";
import { useSession } from "next-auth/react";

const Link: NextPageWithLayout = () => {
  const { data: session } = useSession();

  const { data: links } = useGetLinks(session);
  const { data: categories } = useGetCategories(session);

  const categorizedLinks = useMemo(() => {
    if (!links || !categories) return;
    // if (!links.length || !categories.length) return [];

    // return categories?.flatMap((category) => {
    const categorizedLinks = categories?.flatMap((category) => {
      const spesifiedLinks = links?.filter((link) => {
        return category.id === link.categoryId;
      });
      // console.log(spesifiedLinks);
      return spesifiedLinks.length
        ? [
            {
              categoryId: category.id,
              name: category.name,
              data: spesifiedLinks,
            },
          ]
        : [];
    });

    // console.log("links:", links);
    // console.log("categories:", categories);
    // console.log("categorizedLinks:", categorizedLinks);

    return categorizedLinks;
  }, [links, categories]);

  return (
    <div className="p-4">
      <h2>Favolinks</h2>
      <CategoryForm />
      <AddFavolinkForm />

      <ul className="mt-4">
        {/* TODO: */}
        {categorizedLinks ? (
          categorizedLinks.length > 0 ? (
            categorizedLinks.map((spesifiedLinks) => (
              <li
                key={spesifiedLinks.categoryId}
                className="border border-white border-dashed p-2 m-4"
              >
                <h3>{spesifiedLinks.name}</h3>
                <ul className="flex">
                  {spesifiedLinks.data.map((link) => (
                    <li key={link.videoId} className="w-60 p-1">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.youtube.com/watch?v=${link.videoId}`}
                      >
                        <Image
                          src={link.thumbnailUrl}
                          alt="thumbnail"
                          width={320}
                          height={180}
                          className="rounded-md hover:scale-105 transition-transform"
                        />
                        <h3 className="line-clamp-2">{link.title}</h3>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : null
        ) : (
          <p>loading...</p>
        )}
      </ul>
    </div>
  );
};

Link.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Link;
