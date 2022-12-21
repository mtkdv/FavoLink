import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useAddCategory } from "#/lib/useAddCategory";
import { useSession } from "next-auth/react";
import { useGetCategories } from "#/lib/useGetCategories";

type FormValues = {
  category: string;
};

export const CategoryForm = () => {
  const { data: session } = useSession();
  const { mutate } = useAddCategory();
  const { data: categories } = useGetCategories(session);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate({
      name: data.category,
    });
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <label htmlFor="category">カテゴリを追加してください。</label>
      <div>
        <input
          id="category"
          className="py-1 px-2 w-96 border border-white outline-none bg-transparent"
          {...register("category", {
            required: "入力してください",
            maxLength: {
              value: 20,
              message: "20文字まで",
            },
            validate: {
              maxLimit: () => {
                return categories!.length < 5 || "５つまで";
              },
              duplicate: (v) => {
                return (
                  !categories!.some((category) => {
                    return category.name === v;
                  }) || "重複"
                );
              },
            },
          })}
        />
        <button disabled={!session} className="border border-white">
          追加
        </button>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>
    </form>
  );
};
