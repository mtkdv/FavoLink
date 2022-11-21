import { NextPageWithLayout } from "#/pages/_app";
import Layout from "#/components/Layout";
import { ReactElement, useEffect, useMemo } from "react";
import { AddFavolinkForm } from "#/components/AddFavolinkForm";
import { useLinks } from "#/lib/useLinks";
import Image from "next/image";
import { CategoryForm } from "#/components/CategoryForm";
import { useCategories } from "#/lib/useCategories";

const FavoLink: NextPageWithLayout = () => {
  const { favolinks } = useLinks();
  const { categories } = useCategories();

  const categorizedFavolinks = useMemo(() => {
    return categories?.flatMap((category: any, i: number) => {
      const spesificFavolinks = favolinks?.filter((favolink: any) => {
        return category.title === favolink.categoryTitle;
      });
      console.log(i, spesificFavolinks);
      return spesificFavolinks.length > 0 ? [spesificFavolinks] : [];
    });
  }, [favolinks, categories]);

  useEffect(() => {
    console.log("categorizedFavolinks:", categorizedFavolinks);
  }, [categorizedFavolinks]);

  return (
    <div className="p-4">
      <h2>Favolinks</h2>
      <CategoryForm />
      <AddFavolinkForm />

      <ul className="mt-4">
        {categorizedFavolinks?.length > 0
          ? categorizedFavolinks.map((spesificFavolinks: any) => (
              <li className="border border-white border-dashed p-2 m-4">
                <h3>{spesificFavolinks[0].categoryTitle}</h3>
                <ul>
                  {spesificFavolinks.map((favolink: any) => (
                    <li key={favolink.url} className="w-60 p-1">
                      <a target="_blank" rel="noopener" href={favolink.url}>
                        <Image
                          src={favolink.thumbnailUrl}
                          alt="thumbnail"
                          width={320}
                          height={180}
                          className="rounded-md hover:scale-105 transition-transform"
                        />
                        <h3 className="line-clamp-2">{favolink.title}</h3>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

FavoLink.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FavoLink;
