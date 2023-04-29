import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";

import { Divider } from "#/components/uiParts";
import { queryKeys } from "#/const";
import { ACCEPTED_IMAGE_TYPES, ONE_MEGA_BYTE } from "#/const/customize";
import { useGetCustom } from "#/hooks";
import { bytesToKilobytes, mimeToFileFormat } from "#/utils";

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
  // TODO: 背景を色で選択するタブを追加。
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <h3 className="w-fit text-sm font-semibold tracking-wide">
          ページ背景
        </h3>
      </header>

      <main className="mt-2 rounded-md border border-stone-300 bg-white pb-6">
        {/* 上、タブ */}
        <div className="flex h-8 rounded-t-md border-b border-stone-300">
          {/* 左、通常タブ */}
          <button
            type="button"
            className={clsx(
              "flex flex-1 cursor-not-allowed items-center justify-center space-x-1 rounded-tl-md px-1 text-sm outline-none ring-inset ring-juniper-500 transition focus-visible:ring-2",
              !hasBackground ? "bg-juniper-200 font-bold" : "bg-juniper-100"
            )}
          >
            {/* <FaTools /> */}
            🚧&nbsp;
            <span className="opacity-40">通常</span>
          </button>

          {/* 縦の境界線 */}
          <div className="h-full w-px bg-stone-300" />

          {/* 右、アップロードタブ */}
          <button
            type="button"
            className={clsx(
              "flex-1 rounded-tr-md px-1 text-sm outline-none ring-inset ring-juniper-500 transition focus-visible:ring-2",
              hasBackground ? "bg-juniper-200 font-bold" : "bg-juniper-100"
            )}
          >
            <span className="line-clamp-1">画像アップロード</span>
          </button>
        </div>

        {/* 下 */}
        {hasBackground ? (
          <div className="group/has-background">
            {/* 画像プレビュー */}
            <div className="flex px-5 py-6 max-sm:flex-col max-sm:items-center max-sm:space-y-4 sm:space-x-10">
              {/* 左 現在設定中の画像 */}
              <div className="w-full">
                <div className="flex justify-center">
                  {custom?.backgroundImage ? (
                    <Image
                      src={custom.backgroundImage}
                      alt="現在設定中の画像"
                      width={160}
                      height={240}
                      // FIXME: 他に良い設定がないか
                      className="aspect-[2/3] object-cover shadow-md max-sm:w-60 max-sm:min-w-[160px] sm:w-full"
                    />
                  ) : (
                    <div className="flex aspect-[2/3] items-center justify-center border-2 border-black/5 bg-stone-50 px-1 max-sm:w-60 max-sm:min-w-[160px] sm:w-full">
                      <p className="text-center">
                        背景画像が設定されていません
                      </p>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-center text-sm">現在設定中</p>
              </div>

              {/* 右 アップロード */}
              <div className="w-full">
                <input
                  form={formId}
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleChangeImage}
                  className="sr-only invisible hidden opacity-0"
                />
                <div className="">
                  {previewUrl ? (
                    <>
                      <div className="relative flex justify-center">
                        {/* TODO: あらゆる画像を選択してobject-fitやpositionを設定 */}
                        <div className="absolute flex w-full justify-center">
                          <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="group grid aspect-[2/3] place-items-center outline-none ring-juniper-500 ring-offset-1 transition focus-visible:ring-2 max-sm:w-60 max-sm:min-w-[160px] sm:w-full [&:is(:hover,:focus-visible)]:bg-black/30"
                          >
                            <FaImage
                              size={32}
                              className="text-white opacity-0 transition group-[:is(:hover,:focus-visible)]:opacity-100"
                            />
                          </button>
                        </div>
                        <Image
                          src={previewUrl}
                          alt="アップロード用に選択した画像"
                          width={160}
                          height={240}
                          className="aspect-[2/3] object-cover ring-offset-1 group-[:has(.error-message)]/has-background:ring-red-600 max-sm:w-60 max-sm:min-w-[160px] sm:w-full"
                        />
                      </div>
                      <p className="mt-2 text-center text-sm text-teal-700 group-[:has(.error-message)]/has-background:text-red-600">
                        選択中の画像
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => inputRef.current?.click()}
                          className="flex aspect-[2/3] items-center justify-center border-2 border-black/5 bg-stone-50 outline-none ring-juniper-500 ring-offset-1 transition-[background-color,_border-style,_box-shadow] focus-visible:ring-2 max-sm:w-60 max-sm:min-w-[160px] sm:w-full [&:is(:hover,:focus-visible)]:border-none [&:is(:hover,:focus-visible)]:bg-black/5"
                        >
                          <FaImage size={32} className="opacity-50" />
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => inputRef.current?.click()}
                          className="mt-2 text-center text-sm outline-none ring-juniper-500 focus-visible:ring-2"
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
              <p className="w-fit rounded-t-md border border-b-0 border-stone-300 bg-juniper-200 px-2 py-1 text-xs">
                詳細情報
              </p>

              {/* フレーム */}
              <div className="space-y-2 rounded-b-md rounded-tr-md border border-stone-300 px-4 py-3">
                {/* ファイルサイズ */}
                <div className="flex space-x-4 px-3">
                  {/* 左 */}
                  <div className="w-22 shrink-0">
                    <p className="translate-y-[0.7px] text-xs leading-5 tracking-wide text-stone-500">
                      ファイルサイズ
                    </p>
                  </div>
                  {/* 右 */}
                  <div className="flex-1 space-y-1">
                    {/* MB, KB */}
                    <p
                      className={clsx(
                        "line-clamp-1 h-5 break-all pl-px text-sm tracking-wide",
                        previewFile && previewFile.size > ONE_MEGA_BYTE * 4
                          ? "error-message text-red-600"
                          : "text-teal-600"
                      )}
                    >
                      {previewFile && bytesToKilobytes(previewFile.size)}
                    </p>
                    {/* 注意書き */}
                    <p
                      className={clsx(
                        "line-clamp-1 break-all text-xxs",
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
                    <p className="translate-y-[0.7px] text-xs leading-5 tracking-wide text-stone-500">
                      ファイル形式
                    </p>
                  </div>
                  {/* 右 */}
                  <div className="flex-1 space-y-1">
                    {/* JPEG or PNG */}
                    <p
                      className={clsx(
                        "line-clamp-1 h-5 break-all pl-px text-sm tracking-wide",
                        previewFile &&
                          !ACCEPTED_IMAGE_TYPES.includes(previewFile.type)
                          ? "error-message text-red-600"
                          : "text-teal-600"
                      )}
                    >
                      {previewFile && mimeToFileFormat(previewFile.type)}
                    </p>
                    {/* 注意書き */}
                    <p
                      className={clsx(
                        "line-clamp-1 break-all text-xxs",
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
