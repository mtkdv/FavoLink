import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { CategorySelect } from "./CategorySelect";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";
import { useAddLink } from "#/lib/useAddLink";

export type FormValues = {
  link: string;
  category: string;
};

export const AddFavolinkForm = () => {
  const user = useRecoilValue(userState);
  const { mutate } = useAddLink();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate({
      url: data.link,
      userId: user.uid,
      categoryId: data.category,
    });
  };

  useEffect(() => {
    reset();
    // }, [reset, isSubmitSuccessful]);
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
          {...register("link")}
        />
        <CategorySelect register={register} />
        <button className="border border-white px-2">追加</button>
      </div>
    </form>
  );
};
