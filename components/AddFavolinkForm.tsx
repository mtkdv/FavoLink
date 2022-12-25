import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { CategorySelect } from "./CategorySelect";
import { useAddLink } from "#/lib/useAddLink";
import { demoUrls } from "#/lib/demodata";
import { AiOutlineCopy } from "react-icons/ai";
import { getYouTubeVideoIdFromUrl } from "#/lib/youtube";
import { Link } from "@prisma/client";
import clsx from "clsx";
import { toast } from "react-hot-toast";

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
  const { mutateAsync } = useAddLink();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: "",
    },
  });

  const linkValidation = (videoId: any) => {
    console.log("onSubmitValidation videoId:", videoId);
    if (!videoId) {
      return "YouTube動画のURLを貼ってくださいvv";
    }

    const category = getValues("category");
    const specifiedLinks = categorizedLinks?.find(
      ({ categoryId }) => categoryId === category
    );
    if (specifiedLinks?.data.length === 5) {
      return "一つのカテゴリーに登録できる動画は5つまでですvv";
    }

    const isDuplicated = specifiedLinks?.data.some(
      (link) => link.videoId === videoId
    );
    if (isDuplicated) {
      return "このカテゴリー内にその動画はすでに登録されていますvv";
    }

    return true;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");

    // const videoId = getYouTubeVideoIdFromUrl(data.link);

    // if (!videoId) {
    //   setErrorMessage("YouTube動画のURLを貼ってください");
    //   return;
    // }

    // const specifiedLinks = categorizedLinks?.find(
    //   ({ categoryId }) => categoryId === data.category
    // );
    // if (specifiedLinks?.data.length === 5) {
    //   setErrorMessage("一つのカテゴリーに登録できる動画は5つまでです");
    //   return;
    // }

    // const isDuplicated = specifiedLinks?.data.some(
    //   (link) => link.videoId === videoId
    // );
    // if (isDuplicated) {
    //   setErrorMessage("このカテゴリー内にその動画はすでに登録されています");
    //   return;
    // }

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
          {...register("link", {
            // required: "追加したいYouTube動画のURLを入力してください",
            setValueAs: (v) => {
              // console.log("v:", typeof v); // string
              return getYouTubeVideoIdFromUrl(v);
            },
            validate: (videoId) => linkValidation(videoId),
          })}
        />
        {errors.link && <p className="text-red-500">{errors.link.message}</p>}
        <CategorySelect register={register} />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
        <p className="text-red-500">{errorMessage}</p>
        <button className={clsx("border border-white px-2")}>リンク追加</button>
      </div>
    </form>
  );
};
