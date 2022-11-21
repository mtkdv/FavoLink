import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useSWR from "swr";

type FormValues = {
  category: string;
};

export const CategoryForm = () => {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const postData = { title: data.category };
    await fetch(`/api/categories/create`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    // mutate(`users/8kkpegiVDFB23pIp1dnL`);
    // mutate([`users/8kkpegiVDFB23pIp1dnL`, "categories"]);

    // useSWR(`/api/categories/create`, (url) => {
    //   fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(postData),
    //   });
    // });
    mutate(`/api/categories`);
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
          {...register("category")}
        />
        <button className="border border-white">追加</button>
      </div>
    </form>
  );
};
