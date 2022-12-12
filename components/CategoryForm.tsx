import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useAddCategory } from "#/lib/useAddCategory";
import { useSession } from "next-auth/react";

type FormValues = {
  category: string;
};

export const CategoryForm = () => {
  const { data: session } = useSession();
  const { mutate } = useAddCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate({
      name: data.category,
    });
  };

  useEffect(() => {
    reset();
    // }, [reset, isSubmitSuccessful])
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <label htmlFor="category">カテゴリを追加してください。</label>
      <div>
        <input
          id="category"
          className="py-1 px-2 w-96 border border-white outline-none bg-transparent"
          // TODO: 空文字、同名
          {...register("category")}
        />
        <button disabled={!session} className="border border-white">
          追加
        </button>
      </div>
    </form>
  );
};
