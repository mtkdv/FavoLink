import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/Layout";
import { ReactElement } from "react";
import { AddFavolinkForm } from "#/components/AddFavolinkForm";
import Image from "next/image";
import { CategoryForm } from "#/components/CategoryForm";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import useSWR from "swr";
import { fetchCategorizedFavolinks } from "#/lib/firestore";
import { useQuery } from "@tanstack/react-query";

const FavoLink: NextPageWithLayout = () => {
  const user = useRecoilValue(userState);

  // // const { favolinks } = useLinks();
  // const { data: favolinks } = useSWR(
  //   () => user.uid,
  //   // [() => user.uid, `fetchFavolinks`],
  //   (uid) => fetchFavolinks(uid)
  // );
  // // const { categories } = useCategories();
  // const { data: categories } = useSWR(
  //   // ? 同じ依存をkeyにするのは良くないか？
  //   () => user.uid,
  //   (uid) => fetchCategories(uid)
  // );
  // const { categories } = useCategories();

  // const { data: categorizedFavolinks } = useSWR(
  //   user ? "fetchCategorizedFavolinks" : null,
  //   () => fetchCategorizedFavolinks(user.uid)
  // );

  const { data: categorizedFavolinks } = useQuery({
    queryKey: ["categorizedFavolinks"],
    queryFn: () => fetchCategorizedFavolinks(user.uid),
    enabled: !!user,
  });

  // const categorizedFavolin = useMemo(() => {
  //   return categories?.flatMap((category, i: number) => {
  //     const spesificFavolinks = favolinks?.filter((favolink) => {
  //       return category.title === favolink.categoryTitle;
  //     });
  //     // console.log(i, spesificFavolinks);
  //     return spesificFavolinks && spesificFavolinks.length > 0
  //       ? [spesificFavolinks]
  //       : [];
  //   });
  // }, [favolinks, categories]);

  // useEffect(() => {
  //   console.log("categorizedFavolinks:", categorizedFavolinks);
  // }, [categorizedFavolinks]);

  return (
    <div className="p-4">
      <h2>Favolinks</h2>
      <CategoryForm />
      <AddFavolinkForm />

      <ul className="mt-4">
        {categorizedFavolinks ? (
          categorizedFavolinks.length > 0 ? (
            categorizedFavolinks.map((spesificFavolinks, index) => (
              <li
                key={index}
                className="border border-white border-dashed p-2 m-4"
              >
                <h3>{spesificFavolinks[0].categoryTitle}</h3>
                <ul className="flex">
                  {spesificFavolinks.map((favolink) => (
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
          ) : null
        ) : (
          <p>loading...</p>
        )}
      </ul>
    </div>
  );
};

FavoLink.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FavoLink;
