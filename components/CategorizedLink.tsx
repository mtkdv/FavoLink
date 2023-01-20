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
      const specifiedLinks = links?.filter((link) => {
        return category.id === link.categoryId;
      });
      return specifiedLinks.length
        ? [
            {
              categoryId: category.id,
              name: category.name,
              data: specifiedLinks,
            },
          ]
        : [];
    });
  }, [links, categories]);

  return (
    <section>
      <ul className="space-y-4">
        {/* TODO: */}
        {categorizedLinks ? (
          categorizedLinks.length > 0 ? (
            categorizedLinks.map((specifiedLinks) => (
              <li
                key={specifiedLinks.categoryId}
                className="bg-gradient-to-tr from-white/30 to-white/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-sm p-4 space-y-2"
              >
                <h3>{specifiedLinks.name}</h3>
                <ul className="grid gap-4 grid-cols-2 md:grid-cols-3">
                  {specifiedLinks.data.map((link) => (
                    <li key={link.videoId} className="">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.youtube.com/watch?v=${link.videoId}`}
                      >
                        <div className="overflow-hidden rounded-md">
                          <Image
                            src={link.thumbnailUrl}
                            alt="thumbnail"
                            width={320}
                            height={180}
                            className="hover:scale-105 transition-transform"
                          />
                        </div>
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
