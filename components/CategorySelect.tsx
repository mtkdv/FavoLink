import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./AddFavolinkForm";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import { useGetCategories } from "#/lib/useGetCategories";

type Props = {
  register: UseFormRegister<FormValues>;
};

export const CategorySelect: FC<Props> = ({ register }) => {
  const user = useRecoilValue(userState);

  const { data: categories, isLoading } = useGetCategories(user);

  if (isLoading) return <p>Loading...</p>;
  return categories ? (
    <select
      // TODO: １つ目のoptionを選択できないようにする。
      // react selectなどのライブラリを検討。
      className="bg-transparent border border-white"
      {...register("category")}
    >
      <option>選択してください</option>
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
