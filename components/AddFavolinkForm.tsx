import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { CategorySelect } from "./CategorySelect";

export type FormValues = {
  favolink: string;
  category: string;
};

export const AddFavolinkForm = () => {
  // const router = useRouter();
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const postData = {
      url: data.favolink,
      categoryTitle: data.category,
    };
    await fetch(`/api/favolinks/create`, {
      method: "POST",
      body: JSON.stringify(postData),
    });

    // router.refresh();
    mutate(`/api/favolinks`);
  };

  useEffect(() => {
    reset();
    // いずれrecoilのtodoListStateを依存に入れればおｋ
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <label htmlFor="url">
        <p>
          好きなYouTube<span className="text-red-500">動画のURL</span>
          を貼り付け、追加ボタンを押してください！
        </p>
        <p className="text-sm">
          例：
          <code className="">https://www.youtube.com/watch?v=XZmGGAbHqa0</code>
        </p>
      </label>
      <div className="flex space-x-3">
        <input
          id="url"
          className="py-1 px-2 w-96 border border-white outline-none bg-transparent"
          {...register("favolink")}
        />
        <CategorySelect register={register} />
        <button className="border border-white px-2">追加</button>
      </div>
    </form>
  );
};
