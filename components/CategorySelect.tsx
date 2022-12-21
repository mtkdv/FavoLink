import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./AddFavolinkForm";
import { useGetCategories } from "#/lib/useGetCategories";
import { useSession } from "next-auth/react";

type Props = {
  register: UseFormRegister<FormValues>;
};

export const CategorySelect: FC<Props> = ({ register }) => {
  const { data: session } = useSession();
  const { data: categories, isLoading } = useGetCategories(session);

  if (isLoading) return <p>Loading...</p>;
  return categories ? (
    <select
      //TODO: HTML標準のエラーが表示されている
      required
      //TODO: react-select
      className="bg-transparent border border-white"
      {...register("category")}
    >
      <option value="">選択してください</option>
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
