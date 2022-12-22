import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { CategorySelect } from "./CategorySelect";
import { useAddLink } from "#/lib/useAddLink";
import { demoUrls } from "#/lib/demodata";
import { AiOutlineCopy } from "react-icons/ai";
import { getYouTubeVideoIdFromUrl } from "#/lib/youtube";
import { Link } from "@prisma/client";
import clsx from "clsx";

export type FormValues = {
  link: string;
  category: string;
};

type Props = {
  categorizedLinks:
    | {
        categoryId: string;
        name: string;
        data: Link[];
      }[]
    | undefined;
};

export const AddFavolinkForm: React.FC<Props> = ({ categorizedLinks }) => {
  const { mutateAsync, data: hoge } = useAddLink();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");

    const videoId = getYouTubeVideoIdFromUrl(data.link);

    if (!videoId) {
      setErrorMessage("YouTube動画のURLを貼ってください");
      return;
    }

    const specifiedLinks = categorizedLinks?.find(
      ({ categoryId }) => categoryId === data.category
    );

    const isDuplicated = specifiedLinks?.data.some(
      (link) => link.videoId === videoId
    );
    if (isDuplicated) {
      setErrorMessage("このカテゴリー内にその動画はすでに登録されています");
      return;
    }

    if (specifiedLinks?.data.length === 5) {
      setErrorMessage("一つのカテゴリーに登録できる動画は5つまでです");
      return;
    }

    await mutateAsync({
      videoId,
      categoryId: data.category,
    });
    // if (hoge.message) setErrorMessage(hoge.message);
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
      <div>
        <div className="flex space-x-3">
          {/* TODO: reset button */}
          <input
            id="url"
            className="py-1 px-2 w-96 border border-white outline-none bg-transparent"
            {...register("link", {
              required: "リンクを貼り付けてください",
            })}
          />
          <CategorySelect register={register} />
          <button className={clsx("border border-white px-2")}>
            リンク追加
          </button>
        </div>
        {errors.link && <p className="text-red-500">{errors.link.message}</p>}
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
        <p>{errorMessage}</p>
      </div>
    </form>
  );
};
