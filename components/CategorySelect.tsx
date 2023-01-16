import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { Schema } from "./AddFavolinkForm";
import { useGetCategories } from "#/lib/useGetCategories";
import { useSession } from "next-auth/react";

type Props = {
  register: UseFormRegister<Schema>;
};

export const CategorySelect: FC<Props> = ({ register }) => {
  const { data: session } = useSession();
  const { data: categories, isLoading } = useGetCategories(session);

  if (isLoading) return <p>Loading...</p>;
  return categories ? (
    <select
      //TODO: react-select
      defaultValue=""
      className="bg-transparent border border-white"
      {...register("category")}
    >
      <option disabled value="">
        カテゴリ選択
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  ) : (
    <p>loading...</p>
  );
};
