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
      const spesificLinks = links?.filter((link) => {
        return category.id === link.categoryId;
      });
      return spesificLinks.length
        ? [
            {
              name: category.name,
              data: spesificLinks,
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
    </section>
  );
};
