import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/Layout";
import { ReactElement, useMemo } from "react";
import { AddFavolinkForm } from "#/components/AddFavolinkForm";
import Image from "next/image";
import { CategoryForm } from "#/components/CategoryForm";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import { useGetCategories } from "#/lib/useGetCategories";
import { useGetLinks } from "#/lib/useGetLinks";

const Link: NextPageWithLayout = () => {
  const user = useRecoilValue(userState);

  const { data: links } = useGetLinks(user);
  const { data: categories } = useGetCategories(user);

  const categorizedLinks = useMemo(() => {
    if (!links || !categories) return;
    // if (!links.length || !categories.length) return [];

    // return categories?.flatMap((category) => {
    const categorizedLinks = categories?.flatMap((category) => {
      const spesificLinks = links?.filter((link) => {
        return category.id === link.categoryId;
      });
      // console.log(spesificLinks);
      return spesificLinks.length
        ? [
            {
              name: category.name,
              data: spesificLinks,
            },
          ]
        : [];
    });

    console.log("links:", links);
    console.log("categories:", categories);
    console.log("categorizedLinks:", categorizedLinks);

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
            categorizedLinks.map((spesificLinks, index) => (
              <li
                key={index}
                className="border border-white border-dashed p-2 m-4"
              >
                <h3>{spesificLinks.name}</h3>
                <ul className="flex">
                  {spesificLinks.data.map((link) => (
                    <li key={link.url} className="w-60 p-1">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link.url}
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
