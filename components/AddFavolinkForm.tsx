import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { CategorySelect } from "./CategorySelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavolink } from "#/lib/firestore";
import { useRecoilValue } from "recoil";
import { userState } from "#/store/store";

export type FormValues = {
  favolink: string;
  category: string;
};

export const AddFavolinkForm = () => {
  const user = useRecoilValue(userState);
  // const router = useRouter();
  // const { mutate } = useSWRConfig();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addFavolink,
    // TODO: favolinkを追加しただけだから、favolinksとcategoriesのqueryは分けたほうがいいかも
    onSettled: () => queryClient.invalidateQueries(["categorizedFavolinks"]),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate({
      uid: user.uid,
      url: data.favolink,
      categoryTitle: data.category,
    });
    // const postData = {
    //   url: data.favolink,
    //   categoryTitle: data.category,
    // };
    // await fetch(`/api/favolinks/create`, {
    //   method: "POST",
    //   body: JSON.stringify(postData),
    // });

    // router.refresh();
    // mutate(`/api/favolinks`);
  };

  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful]);

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
