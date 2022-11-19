import { NextPageWithLayout } from "#/pages/_app";
import Layout from "#/components/Layout";
import { ReactElement, useMemo } from "react";
import { AddFavolinkForm } from "#/components/AddFavolinkForm";
import { useLinks } from "#/lib/useLinks";
import Image from "next/image";
import { CategoryForm } from "#/components/CategoryForm";
import { useCategories } from "#/lib/useCategories";

const FavoLink: NextPageWithLayout = () => {
  const { favolinks, isLoading: isLoadingLinks } = useLinks();
  const { categories } = useCategories();

  const sortedCategories = useMemo(() => {

  }, [categories])

  const categolizedFavolinks = useMemo(() => {

  }, [favolinks, categories])

  if (isLoadingLinks) return <span>Loading...</span>;
  return (
    <div className="p-4">
      <h2>Favolinks</h2>
      <CategoryForm />
      <AddFavolinkForm />

      // TODO: 仮
      {categolizedFavolinks.map(favolinks => (
        <div className="border border-white">
          {/* categoryIdではなくcategory titleで管理していれば下記でアクセスできる */}
          <h3>{favolinks[0].category}</h3>
          {favolinks.map(favolink => (

          ))}
        </div>
      ))}

      <ul>
        {favolinks?.map((favolink) => (
          <li key={favolink.url} className="w-60">
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
    </div>
  );
};

FavoLink.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FavoLink;
