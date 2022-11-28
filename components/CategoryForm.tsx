import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
// import { useSWRConfig } from "swr";
import useSWR from "swr";
import { addCategory } from "#/lib/firestore";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormValues = {
  category: string;
};

export const CategoryForm = () => {
  const user = useRecoilValue(userState);
  // const { mutate } = useSWRConfig();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addCategory,
    onSettled: () => queryClient.invalidateQueries(["categories"]),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const postData = { title: data.category };
    // await fetch(`/api/categories/create`, {
    //   method: "POST",
    //   body: JSON.stringify(postData),
    // });
    // mutate(`users/8kkpegiVDFB23pIp1dnL`);
    // mutate([`users/8kkpegiVDFB23pIp1dnL`, "categories"]);

    // useSWR(`/api/categories/create`, (url) => {
    //   fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(postData),
    //   });
    // });
    // mutate(`/api/categories`);

    // addCategory({
    //   uid: user.uid,
    //   title: data.category,
    // });

    // addCategory({
    //   uid: user.uid,
    //   title: data.category,
    // });

    // react query
    mutate({
      uid: user.uid,
      title: data.category,
    });

    // TODO: CategorySelect内でfetchCategoryのリフェッチ
    // mutate(user ? "fetchCategories" : null);
    // mutate([user, "fetchCategories"]);
    // mutate();
  };

  useEffect(() => {
    reset();
    // いずれrecoilのtodoListStateを依存に入れればおｋ
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
        <button className="border border-white">追加</button>
      </div>
    </form>
  );
};
