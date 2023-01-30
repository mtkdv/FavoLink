import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { CategorySelect } from "./CategorySelect";
import { useAddLink } from "#/lib/useAddLink";
import { demoUrls } from "#/lib/demodata";
import { AiOutlineCopy } from "react-icons/ai";
import { getYouTubeVideoIdFromUrl } from "#/lib/youtube";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  link: z.string().transform((url, ctx) => {
    const videoId = getYouTubeVideoIdFromUrl(url);
    if (videoId === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "YouTube動画のURLを貼ってください",
      });
      return z.NEVER;
    }
    return videoId;
  }),
  category: z.string().min(1, "カテゴリを選択してください"),
});

export type Schema = z.infer<typeof schema>;

export const AddFavolinkForm: React.FC = () => {
  const { mutateAsync } = useAddLink();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      category: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setErrorMessage("");

    const mutateData = await mutateAsync({
      // videoId,
      videoId: data.link,
      categoryId: data.category,
    });

    switch (mutateData?.type) {
      case "success":
        toast.success(mutateData.message);
        break;
      case "error":
        setErrorMessage(mutateData.message);
        // toast.error(mutateData.message);
        return;
    }

    // toast.promise(
    //   mutateAsync({
    //     videoId,
    //     categoryId: data.category,
    //   }),
    //   {
    //     loading: "Loading",
    //     success: (data) => data.message,
    //     error: (err) => `This just happened: ${err.toString()}`,
    //   }
    // );

    reset();
  };

  const handleCopyUrl = (e: any) => {
    // console.log(e.currentTarget.previousElementSibling.innerHTML);
    navigator.clipboard.writeText(
      e.currentTarget.previousElementSibling.innerText
    );
  };

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
        {/* demo url */}
        <ul>
          {demoUrls.map((url, index) => (
            <li key={index} className="flex w-[400px]">
              <p className="flex-1">{url}</p>
              <span
                className="hover:cursor-pointer"
                onClick={(e) => handleCopyUrl(e)}
              >
                <AiOutlineCopy />
              </span>
            </li>
          ))}
        </ul>
      </label>
      <div className="flex flex-col">
        {/* TODO: reset button */}
        <input
          id="url"
          className="py-1 px-2 w-96 border border-white outline-none bg-transparent"
          {...register("link")}
        />
        {errors.link && <p className="text-red-500">{errors.link.message}</p>}
        <CategorySelect register={register} />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
        <p className="text-red-500">{errorMessage}</p>
        <button className="border border-white px-2">リンク追加</button>
      </div>
    </form>
  );
};
