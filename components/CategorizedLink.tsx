import { Category, Link } from "@prisma/client";
import Image from "next/image";
import { FC, useMemo } from "react";

type Props = {
  categories: Category[] | undefined;
  links: Link[] | undefined;
};

export const CategorizedLink: FC<Props> = ({ categories, links }) => {
  const categorizedLinks = useMemo(() => {
    if (!links || !categories) return;
    // if (!links.length || !categories.length) return [];

    return categories?.flatMap((category) => {
      const spesifiedLinks = links?.filter((link) => {
        return category.id === link.categoryId;
      });
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
  }, [links, categories]);

  return (
    <section>
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
    </section>
  );
};
