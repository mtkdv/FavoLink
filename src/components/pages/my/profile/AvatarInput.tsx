import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { TbCameraPlus } from "react-icons/tb";

import { Divider } from "#/components/uiParts";
import { queryKeys } from "#/const";
import { ACCEPTED_IMAGE_TYPES, ONE_MEGA_BYTE } from "#/const/profile";
import { bytesToKilobytes, mimeToFileFormat } from "#/utils";
import { useGetProfile } from "#/hooks";
import silhouetteAvatar from "/public/silhouette-avatar.png";

export const AvatarInput = ({
  previewFile,
  setPreviewFile,
}: {
  previewFile: File | undefined;
  setPreviewFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) => {
  const { data: profile } = useGetProfile();
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
    <li>
      <div className="ml-1">
        <h3 className="text-xs w-fit text-cocoa-800 font-semibold tracking-wide">
          Profile Icon
        </h3>
      </div>

      <div className="group/avatar mt-2 rounded-md bg-white/50 border border-stone-300 px-2 py-3 flex space-x-2 [&:has(.error-message)]:border-red-600 ">
        {/* 左: Inputs */}
        <div className="group/avatar-inputs relative flex items-center shrink-0">
          <Image
            src={previewUrl ?? profile?.image ?? silhouetteAvatar}
            alt="avatar-inputs"
            width={112}
            height={112}
            className="rounded-full w-28 h-28 object-cover shadow-md"
          />

          {/* Avatar Label */}
          <div className="absolute w-full h-full clip-path-circle">
            <label
              htmlFor="img-input"
              className="absolute group bottom-0 w-full h-2/5 bg-black/30 grid place-items-center cursor-pointer hover:bg-black/40 group-[:has(:focus-visible)]/avatar-inputs:bg-black/40 transition"
            >
              <TbCameraPlus
                size={20}
                className="text-white group-hover:scale-105 group-[:has(:focus-visible)]/avatar-inputs:scale-105 transition"
              />
            </label>
          </div>

          {/* Avatar Input */}
          <input
            form={formId}
            type="file"
            accept="image/*"
            id="img-input"
            className="sr-only"
            onChange={handleChangeImage}
          />
        </div>

        {/* 右: 詳細、エラーメッセージ  */}
        <div className="grow flex flex-col justify-between">
          {/* File Name */}
          <div className="px-2">
            <p className="line-clamp-1 break-all h-5 text-stone-600 text-sm tracking-wide">
              {previewFile?.name}
            </p>
          </div>

          <Divider />

          {/* ファイルサイズ */}
          <div className="flex space-x-3 px-2">
            {/* 左 */}
            <div className="w-11 shrink-0">
              <p className="text-xs tracking-wide text-right leading-5 translate-y-[0.7px] text-stone-500">
                Size:
              </p>
            </div>
            {/* 右 */}
            <div className="flex-1">
              {/* MB, KB */}
              <p
                className={clsx(
                  "pl-px text-sm h-5 tracking-wide",
                  previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                    ? "text-red-600"
                    : "text-cocoa-400"
                )}
              >
                {previewFile && bytesToKilobytes(previewFile.size)}
              </p>
              {/* Note */}
              <p
                className={clsx(
                  "text-xxs line-clamp-1 break-all",
                  previewFile && previewFile.size > ONE_MEGA_BYTE * 2
                    ? "text-red-600 error-message"
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
              <p className="text-xs tracking-wide text-right leading-5 translate-y-[0.7px] text-stone-500">
                Format:
              </p>
            </div>
            {/* R */}
            <div className="flex-1">
              {/* JPEG or PNG */}
              <p
                className={clsx(
                  "pl-px text-sm h-5 tracking-wide",
                  previewFile &&
                    !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                    ? "text-red-600"
                    : "text-cocoa-400"
                )}
              >
                {previewFile && mimeToFileFormat(previewFile.type)}
              </p>
              {/* Note */}
              <p
                className={clsx(
                  "text-xxs line-clamp-1 break-all",
                  previewFile &&
                    !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                    ? "text-red-600 error-message"
                    : "text-stone-500"
                )}
              >
                アップロード可能な形式は JPEG と PNG です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
