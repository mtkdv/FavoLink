import Image from "next/image";
import { useRef, useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { FaImage } from "react-icons/fa";

import { Divider } from "#/components/uiParts";
import { bytesToKilobytes, mimeToFileFormat } from "#/utils";
import { ACCEPTED_IMAGE_TYPES, ONE_MEGA_BYTE } from "#/const/customize";
import { useGetCustom } from "#/hooks";
import { queryKeys } from "#/const";

export const BackgroundSelect = ({
  previewUrl,
  setPreviewUrl,
  previewFile,
  setPreviewFile,
}: {
  previewUrl: string | undefined;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  previewFile: File | undefined;
  setPreviewFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) => {
  const { data: custom } = useGetCustom();
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasBackground, setHasBackground] = useState(true);
  const { data: formId } = useQuery({
    queryKey: queryKeys.form.customize,
    initialData: "",
    enabled: false,
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file: File | null = e.target.files.item(0);

    /** キャンセル時 */
    if (file === null) return;

    setPreviewFile(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      {/* ページ背景、ヘッダー */}
      <header className="ml-1">
        <h3 className="text-sm font-semibold tracking-wide w-fit">
          ページ背景
        </h3>
      </header>

      <main className="mt-2 rounded-md pb-6 border border-stone-300 bg-white">
        {/* 上、タブ */}
        <div className="flex h-8 rounded-t-md border-b border-stone-300">
          {/* 左、通常タブ */}
          <button
            type="button"
            className={clsx(
              "flex-1 text-sm outline-none rounded-tl-md ring-inset focus-visible:ring-2 px-1",
              "flex justify-center items-center space-x-1 cursor-not-allowed",
              !hasBackground ? "font-bold bg-cocoa-100" : "bg-orange-50"
            )}
          >
            {/* <FaTools /> */}
            🚧&nbsp;
            <span className="opacity-40">通常</span>
          </button>

          {/* 縦の境界線 */}
          <div className="w-px h-full bg-stone-300" />

          {/* 右、アップロードタブ */}
          <button
            type="button"
            className={clsx(
              "flex-1 text-sm outline-none rounded-tr-md ring-inset focus-visible:ring-2 px-1",
              hasBackground ? "font-bold bg-cocoa-100" : "bg-orange-50"
            )}
          >
            <span className="line-clamp-1">画像アップロード</span>
          </button>
        </div>

        {/* 下 */}
        {hasBackground ? (
          <div className="group/has-background">
            {/* 画像プレビュー */}
            <div className="flex max-sm:flex-col max-sm:items-center max-sm:space-y-4 sm:space-x-10 px-5 py-6">
              {/* 左 現在設定中の画像 */}
              <div className="w-full">
                <div className="flex justify-center">
                  {custom?.backgroundImage ? (
                    <Image
                      src={custom.backgroundImage}
                      alt="現在設定中の画像"
                      width={160}
                      height={240}
                      // className="max-sm:w-60 max-sm:min-w-[160px] sm:w-40 aspect-[2/3] shadow-md object-cover"
                      className="max-sm:w-60 max-sm:min-w-[160px] sm:w-full aspect-[2/3] shadow-md object-cover"
                    />
                  ) : (
                    <div className="max-sm:w-60 max-sm:min-w-[160px] sm:w-full aspect-[2/3] bg-stone-50 border-2 border-black/5 flex justify-center items-center px-1">
                      <p className="text-center">
                        背景画像が設定されていません
                      </p>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-center">現在設定中</p>
              </div>

              {/* 右 アップロード */}
              <div className="w-full">
                <input
                  form={formId}
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleChangeImage}
                  className="sr-only opacity-0 invisible hidden"
                />
                <div className="">
                  {previewUrl ? (
                    <>
                      <div className="relative flex justify-center">
                        {/* TODO: あらゆる画像を選択してobject-fitやpositionを設定 */}
                        <div className="absolute w-full flex justify-center">
                          <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="group max-sm:w-60 max-sm:min-w-[160px] sm:w-full aspect-[2/3] [&:is(:hover,:focus-visible)]:bg-black/30 transition grid place-items-center outline-none focus-visible:ring-2 ring-offset-1"
                          >
                            <FaImage
                              size={32}
                              className="text-white opacity-0 group-[:is(:hover,:focus-visible)]:opacity-100 transition"
                            />
                          </button>
                        </div>
                        <Image
                          src={previewUrl}
                          alt="アップロード用に選択した画像"
                          width={160}
                          height={240}
                          className="max-sm:w-60 max-sm:min-w-[160px] sm:w-full aspect-[2/3] object-cover group-[:has(.error-message)]/has-background:ring-red-600 ring-offset-1"
                        />
                      </div>
                      <p className="mt-2 text-sm text-center text-cocoa-400 group-[:has(.error-message)]/has-background:text-red-600">
                        選択中の画像
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => inputRef.current?.click()}
                          className="max-sm:w-60 max-sm:min-w-[160px] sm:w-full aspect-[2/3] bg-stone-50 border-2 border-black/5 [&:is(:hover,:focus-visible)]:bg-black/5 [&:is(:hover,:focus-visible)]:border-none transition-[background-color,_border-style,_box-shadow] flex justify-center items-center outline-none focus-visible:ring-2 ring-offset-1"
                        >
                          <FaImage size={32} className="opacity-50" />
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => inputRef.current?.click()}
                          // TODO: focus時
                          className="mt-2 text-sm text-center outline-none focus-visible:ring-2"
                        >
                          ファイルを選択
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* プレビュー詳細 */}
            <div className="px-5">
              {/* ラベル */}
              <p className="bg-cocoa-100 border border-b-0 border-stone-300 py-1 px-2 w-fit text-xs rounded-t-md">
                詳細情報
              </p>

              {/* フレーム */}
              <div className="space-y-2 border border-stone-300 rounded-tr-md rounded-b-md px-4 py-3">
                {/* ファイルサイズ */}
                <div className="flex space-x-4 px-3">
                  {/* 左 */}
                  <div className="w-22 shrink-0">
                    <p className="text-xs tracking-wide leading-5 translate-y-[0.7px] text-stone-500">
                      ファイルサイズ
                    </p>
                  </div>
                  {/* 右 */}
                  <div className="flex-1 space-y-1">
                    {/* MB, KB */}
                    <p
                      className={clsx(
                        "pl-px text-sm h-5 tracking-wide break-all line-clamp-1",
                        previewFile && previewFile.size > ONE_MEGA_BYTE * 4
                          ? "text-red-600 error-message"
                          : "text-cocoa-400"
                      )}
                    >
                      {previewFile && bytesToKilobytes(previewFile.size)}
                    </p>
                    {/* 注意書き */}
                    <p
                      className={clsx(
                        "text-xxs line-clamp-1 break-all",
                        previewFile && previewFile.size > ONE_MEGA_BYTE * 4
                          ? "text-red-600"
                          : "text-stone-500"
                      )}
                    >
                      ファイルサイズの上限は 4MB までです。
                    </p>
                  </div>
                </div>

                <Divider />

                {/* ファイル形式 */}
                <div className="flex space-x-4 px-3">
                  {/* 左 */}
                  <div className="w-22 shrink-0">
                    <p className="text-xs tracking-wide leading-5 translate-y-[0.7px] text-stone-500">
                      ファイル形式
                    </p>
                  </div>
                  {/* 右 */}
                  <div className="flex-1 space-y-1">
                    {/* JPEG or PNG */}
                    <p
                      className={clsx(
                        "pl-px text-sm h-5 tracking-wide break-all line-clamp-1",
                        previewFile &&
                          !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                          ? "text-red-600 error-message"
                          : "text-cocoa-400"
                      )}
                    >
                      {previewFile && mimeToFileFormat(previewFile.type)}
                    </p>
                    {/* 注意書き */}
                    <p
                      className={clsx(
                        "text-xxs line-clamp-1 break-all",
                        previewFile &&
                          !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                          ? "text-red-600"
                          : "text-stone-500"
                      )}
                    >
                      {/* アップロード可能な形式は JPEG と PNG です。 */}
                      対応フォーマットは JPEG / PNG / GIF です。
                    </p>
                  </div>
                </div>

                <Divider />

                {/* 推奨解像度 */}
                <div className="flex space-x-4 px-3">
                  {/* 左 */}
                  <div className="w-22 shrink-0">
                    <p className="text-xs leading-5 tracking-wide text-stone-500">
                      推奨解像度
                    </p>
                  </div>
                  {/* 右 */}
                  {/* 注意書き */}
                  <p className="flex-1 text-xs leading-5 text-stone-500">
                    1280 x 1920
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};
