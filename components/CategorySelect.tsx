import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./AddFavolinkForm";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import { fetchCategories } from "#/lib/firestore";
import { useQuery } from "@tanstack/react-query";

type Props = {
  register: UseFormRegister<FormValues>;
};

export const CategorySelect: FC<Props> = ({ register }) => {
  const user = useRecoilValue(userState);
  // const { data: categories } = useSWR(() => user.uid, fetchCategories);
  // const { data: categories } = useSWR(user ? "fetchCategories" : null, () =>
  //   fetchCategories(user.uid)
  // );
  // const { data: categories } = useSWR([user, "fetchCategories"], () =>
  //   fetchCategories(user.uid)
  // );

  // react query
  const { data: categories, isLoading } = useQuery({
    // queryKey: ["categories", user.uid],
    queryKey: ["categories"],
    queryFn: () => fetchCategories(user.uid),
    // The query will not execute until the user exists
    enabled: !!user,
  });

  if (isLoading) return <p>Loading...</p>;
  return categories ? (
    <select
      // TODO: １つ目のoptionを選択できないようにする。
      // react selectなどのライブラリを検討。
      className="bg-transparent border border-white"
      {...register("category")}
    >
      <option>選択してください</option>
      {categories.map((category: any) => (
        <option key={category.title} value={category.title}>
          {category.title}
        </option>
      ))}
    </select>
  ) : (
    <p>loading...</p>
  );
};
