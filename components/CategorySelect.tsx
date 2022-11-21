import { useCategories } from "#/lib/useCategories";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./AddFavolinkForm";
import useSWR from "swr";

type Props = {
  register: UseFormRegister<FormValues>;
};

export const CategorySelect: FC<Props> = ({ register }) => {
  const { categories } = useCategories();

  // if (isLoading) return <span>Loading...</span>;
  return (
    <select
      className="bg-transparent border border-white"
      {...register("category")}
    >
      <option selected>選択してください</option>
      {categories?.map((category: any) => (
        <option key={category.title} value={category.title}>
          {category.title}
        </option>
      ))}
    </select>
  );
};
