import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAddCategory } from "#/lib/useAddCategory";
// import { useSession } from "next-auth/react";
// import { useGetCategories } from "#/lib/useGetCategories";
import { RxExclamationTriangle } from "react-icons/rx";
import { toast } from "react-hot-toast";

export type FormValues = {
  category: string;
};

export const CategoryForm = () => {
  // const { data: session } = useSession();
  const { mutateAsync } = useAddCategory();
  // const { data: categories } = useGetCategories(session);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    // reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");

    // // TODO: 'categories' is possibly 'undefined'
    // if (categories!.length === 5) {
    //   setErrorMessage("登録できるカテゴリーは５つまでです。");
    //   return;
    // }

    // const isDuplicated = categories!.some((category) => {
    //   return category.name === data.category;
    // });
    // if (isDuplicated) {
    //   setErrorMessage(
    //     "登録済みのカテゴリー名です。カテゴリー名を変更してください。"
    //   );
    //   return;
    // }

    // mutate({
    //   name: data.category,
    // });
    // mutate(data);

    const mutateData = await mutateAsync(data);

    switch (mutateData.type) {
      case "success":
        toast.success(mutateData.message);
        break;
      case "error":
        setErrorMessage(mutateData.message);
        // toast.error(mutateData.message);
        return;
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <label htmlFor="category">カテゴリを追加してください</label>
      <div>
        <input
          id="category"
          className="py-1 px-2 w-96 border border-white outline-none bg-transparent"
          {...register("category", {
            // TODO: pattern space
            required: "追加したいカテゴリー名を入力してください",
            maxLength: {
              value: 30,
              message: "30字以内で入力してください",
            },
            validate: (value) => {
              return !!value.trim() || "空白文字のみの入力はできません";
            },

            // validate: {
            //   maxLimit: () => {
            //     return (
            //       categories!.length < 5 ||
            //       "登録できるカテゴリーは５つまでです。"
            //     );
            //   },
            //   duplicate: (v) => {
            //     return (
            //       !categories!.some((category) => {
            //         return category.name === v;
            //       }) ||
            //       "登録済みのカテゴリー名です。カテゴリー名を変更してください。"
            //     );
            //   },
            // },
          })}
        />
        <button className="border border-white">追加</button>
        {/* TODO: 似たような記述、冗長 */}
        {errors.category && (
          <div className="text-red-500 flex space-x-1.5">
            <RxExclamationTriangle className="relative top-[5px]" />
            <p>{errors.category.message}</p>
          </div>
        )}
        {errorMessage.length > 0 && (
          <div className="text-red-500 flex space-x-1.5">
            <RxExclamationTriangle className="relative top-[5px]" />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
};
