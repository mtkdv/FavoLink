import Image from "next/image";
import { useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { TbCameraPlus } from "react-icons/tb";

import { Divider } from "#/components/uiParts";
import { queryKeys } from "#/const";
import { ACCEPTED_IMAGE_TYPES, ONE_MEGA_BYTE } from "#/const/profile";
import { bytesToKilobytes, mimeToFileFormat } from "#/utils";
import { useGetProfileBaseInfo } from "#/hooks";
import silhouetteAvatar from "/public/silhouette-avatar.png";

export const AvatarInput = ({
  previewFile,
  setPreviewFile,
}: {
  previewFile: File | undefined;
  setPreviewFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) => {
  const inputId = useId();
  const { data: profile } = useGetProfileBaseInfo();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form.profile,
    initialData: "",
    enabled: false,
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("handleChangeImage");
    // return;

    if (!e.target.files) return;
    const file: File | null = e.target.files.item(0);

    /** キャンセル時 */
    if (file === null) {
      /** 未選択＋キャンセル */
      // if (!previewData) return;

      /**
       * 選択->キャンセル
       * filesはリセットされる。
       */

      // TODO: returnでいいか検討。
      return;
    }

    setPreviewFile(file);

    setPreviewUrl(URL.createObjectURL(file));

    /** FileReaderを利用したpreviewUrlの取得 */
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const res = reader.result;
    //   if (res && typeof res === "string") {
    //     setPreviewUrl(res);
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <div className="ml-1">
        <h3 className="w-fit text-xs font-semibold tracking-wide">
          Profile Icon
        </h3>
      </div>

      <div className="mt-2 flex space-x-2 rounded-md border border-stone-300 bg-white/50 px-2 py-3 [&:has(.error-message)]:border-red-600 ">
        {/* 左: Inputs */}
        <div className="group/avatar-inputs relative flex shrink-0 items-center">
          <Image
            src={previewUrl ?? profile?.image ?? silhouetteAvatar}
            alt="avatar-inputs"
            width={112}
            height={112}
            className="h-28 w-28 rounded-full object-cover shadow-md"
          />

          {/* Avatar Label */}
          <div className="clip-path-circle absolute h-full w-full">
            <label
              htmlFor={inputId}
              className="group absolute bottom-0 grid h-2/5 w-full cursor-pointer place-items-center bg-black/30 transition hover:bg-black/40 group-[:has(:focus-visible)]/avatar-inputs:bg-black/40"
            >
              <TbCameraPlus
                size={20}
                className="text-white transition group-hover:scale-105 group-[:has(:focus-visible)]/avatar-inputs:scale-105"
              />
            </label>
          </div>

          {/* Avatar Input */}
          <input
            form={formId}
            type="file"
            accept="image/*"
            id={inputId}
            className="sr-only"
            onChange={handleChangeImage}
          />
        </div>

        {/* 右: 詳細、エラーメッセージ  */}
        <div className="flex grow flex-col justify-between">
          {/* File Name */}
          <div className="px-2">
            <p className="line-clamp-1 h-5 break-all text-sm tracking-wide text-stone-600">
              {previewFile?.name}
            </p>
          </div>

          <Divider />

          {/* ファイルサイズ */}
          <div className="flex space-x-3 px-2">
            {/* 左 */}
            <div className="w-11 shrink-0">
              <p className="translate-y-[0.7px] text-right text-xs leading-5 tracking-wide text-stone-500">
                Size:
              </p>
            </div>
            {/* 右 */}
            <div className="flex-1">
              {/* MB, KB */}
              <p
                className={clsx(
                  "h-5 pl-px text-sm tracking-wide",
                  previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                    ? "text-red-600"
                    : "text-teal-600"
                )}
              >
                {previewFile && bytesToKilobytes(previewFile.size)}
              </p>
              {/* Note */}
              <p
                className={clsx(
                  "line-clamp-1 break-all text-xxs",
                  previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                    ? "error-message text-red-600"
                    : "text-stone-500"
                )}
              >
                ファイルサイズの上限は 2MB までです。
              </p>
            </div>
          </div>

          <Divider />

          {/* File Format */}
          <div className="flex space-x-3 px-2">
            {/* L */}
            <div className="w-11 shrink-0">
              <p className="translate-y-[0.7px] text-right text-xs leading-5 tracking-wide text-stone-500">
                Format:
              </p>
            </div>
            {/* R */}
            <div className="flex-1">
              {/* JPEG or PNG */}
              <p
                className={clsx(
                  "h-5 pl-px text-sm tracking-wide",
                  previewFile &&
                    !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                    ? "text-red-600"
                    : "text-teal-600"
                )}
              >
                {previewFile && mimeToFileFormat(previewFile.type)}
              </p>
              {/* Note */}
              <p
                className={clsx(
                  "line-clamp-1 break-all text-xxs",
                  previewFile &&
                    !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                    ? "error-message text-red-600"
                    : "text-stone-500"
                )}
              >
                アップロード可能な形式は JPEG と PNG です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
