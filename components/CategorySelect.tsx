import { useCategories } from "#/lib/useCategories";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./AddFavolinkForm";

type Props = {
  register: UseFormRegister<FormValues>;
};

export const CategorySelect: FC<Props> = ({ register }) => {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <span>Loading...</span>;
  return (
    <select
      className="bg-transparent border border-white"
      {...register("category")}
    >
      <option selected>選択してください</option>
      {categories?.map((category) => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </select>
  );
};
