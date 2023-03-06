import Image from "next/image";
import {
  ReactElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { Mode } from "@prisma/client";
import { z } from "zod";
import { FaImage } from "react-icons/fa";
import { PuffLoader } from "react-spinners";

import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared";
import { CustomizeSkeleton } from "#/components/pages/my/customize/CustomizeSkeleton";
import { Divider } from "#/components/uiParts";
import { ACCEPTED_IMAGE_TYPES, ONE_MEGA_BYTE } from "#/const/customize";
import { bytesToKilobytes, mimeToFileFormat, uploadAndGetUrl } from "#/utils";
import { useGetCustom, usePatchCustom } from "#/hooks";
import silhouetteAvatar from "/public/silhouette-avatar.png";

const fileSchema = z.custom<File>().superRefine((file, ctx) => {
  if (file.size > ONE_MEGA_BYTE * 4) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: "number",
      maximum: ONE_MEGA_BYTE * 4,
      inclusive: true,
      message: "ファイルサイズの上限は 4MB までです。",
    });
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    // if (!["image/png"].includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_enum_value,
      options: ACCEPTED_IMAGE_TYPES,
      received: file.type,
      message: "対応フォーマットは JPEG / PNG / GIF です。",
    });
  }
});

export type FileSchema = z.infer<typeof fileSchema>;

const Customize: NextPageWithLayout = () => {
  const { data: custom, isLoading } = useGetCustom();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [previewFile, setPreviewFile] = useState<File>();
  // const [verifiedText, setVerifiedText] = useState("");
  const { mutateAsync } = usePatchCustom();
  const [hasBackground, setHasBackground] = useState(true);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<Mode>();
  const modeId = useId();

  const inputRef = useRef<HTMLInputElement>(null);

  const isDirty = useMemo(() => {
    return !!previewFile || (mode && mode !== custom?.mode);
  }, [previewFile, mode]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setPreviewUrl(undefined);
      setPreviewFile(undefined);
      setMode(undefined);
      setIsSubmitSuccessful(false);
    }
  }, [isSubmitSuccessful]);

  /**
   * @param {string | null} fData.slug 初期値はschema.prismaのString?によりnull
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Loading Test
    // await new Promise((r) => setTimeout(r, 3000));

    /**
     * Cloud Storage for Firebaseへの画像の保存とdownloadURLの取得
     * => ファイル未選択時: FileList { length: 0 }
     * => 選択時: FileList { 0: File, length: 1 }
     */
    let backgroundImage: string | undefined;

    if (previewFile) {
      const parsedFile = fileSchema.safeParse(previewFile);
      if (!parsedFile.success) {
        parsedFile.error.issues.forEach(({ message }) => toast.error(message));
        setIsSubmitting(false);
        return;
      }
      backgroundImage = await uploadAndGetUrl(parsedFile.data);
    }

    const data = {
      backgroundImage,
      mode,
    };

    mutateAsync(data, {
      onSuccess(data, variables, context) {
        setIsSubmitSuccessful(true);
        toast.success("変更を保存しました。");
      },
      onError(error, variables, context) {
        console.log("customize onSubmit onError:", error);
        if (error.response?.data.code === "P2000") {
          // toast.error(error.response.data.message);
          toast.error("ファイル名を短くし、アップロードし直してください。");
        }
      },
      onSettled(data, error, variables, context) {
        setIsSubmitting(false);
      },
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file: File | null = e.target.files.item(0);

    /** キャンセル時 */
    if (file === null) return;

    setPreviewFile(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as Mode);
  };

  if (isLoading) {
    return <CustomizeSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-6 animate-appearance">
      {/* Sticky Header（ページタイトル、保存ボタン） */}
      <header className="sticky top-0 z-30 h-16 bg-base-white flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <div className="relative">
            <div className="absolute right-2 bottom-0 flex justify-end">
              {/* Save Button */}
              <div className="">
                <form
                  id="customize-form"
                  onSubmit={onSubmit}
                  className="h-full"
                >
                  <button
                    disabled={!isDirty || isSubmitting}
                    form="customize-form"
                    className={clsx(
                      "relative group h-9 w-28 rounded-md outline-none overflow-hidden transition bg-cocoa-400 border border-cocoa-400 flex justify-center items-center",
                      isDirty
                        ? "focus-visible:ring-2 ring-cocoa-400 ring-offset-1 hover:bg-cocoa-500"
                        : "cursor-not-allowed opacity-40",
                      isSubmitting && "cursor-progress"
                    )}
                  >
                    <span
                      className={clsx(
                        "absolute bottom-0 left-0 w-full h-1/2 rounded-b-md bg-cocoa-500 transition",
                        isDirty ? "group-hover:bg-cocoa-600" : ""
                      )}
                    />
                    {isSubmitting ? (
                      <PuffLoader color="white" size={24} />
                    ) : (
                      <span className="text-sm tracking-wider font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] text-white">
                        変更を保存
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ページタイトル */}
            <h2 className="ml-2 text-lg font-bold w-fit">カスタマイズ</h2>
          </div>

          {/* Divider */}
          <div className="shadow-md">
            <Divider />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 py-4 space-y-12 animate-appearance">
        {/* Customi]ze Inputs */}
        <div className="flex flex-col space-y-12">
          {/* ページ背景 */}
          <div className="space-y-2">
            {/* ページ背景 ラベル */}
            <div className="ml-1">
              <h3 className="text-sm font-semibold tracking-wide w-fit">
                ページ背景
              </h3>
            </div>

            {/* <div className="rounded-md pb-6 ring-1 ring-stone-300"> */}
            <div className="rounded-md pb-6 border border-stone-300">
              {/* 上、タブ */}
              <div className="flex h-8 rounded-t-md border-b border-stone-300">
                {/* 左、通常タブ */}
                <button
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
                        <Image
                          // TODO: src
                          src={custom?.backgroundImage ?? silhouetteAvatar}
                          alt="現在設定中の画像"
                          width={160}
                          height={240}
                          // className="max-sm:w-60 max-sm:min-w-[160px] sm:w-40 aspect-[2/3] shadow-md object-cover"
                          className="max-sm:w-60 max-sm:min-w-[160px] sm:w-full aspect-[2/3] shadow-md object-cover"
                        />
                      </div>
                      <p className="mt-2 text-sm text-center">現在設定中</p>
                    </div>

                    {/* 右 アップロード */}
                    <div className="w-full">
                      <input
                        form="customize-form"
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
                                onClick={() => inputRef.current?.click()}
                                className="max-sm:w-60 max-sm:min-w-[160px] sm:w-full aspect-[2/3] bg-stone-50 border-2 border-black/5 [&:is(:hover,:focus-visible)]:bg-black/5 [&:is(:hover,:focus-visible)]:border-none transition-[background-color,_border-style,_box-shadow] flex justify-center items-center outline-none focus-visible:ring-2 ring-offset-1"
                              >
                                <FaImage size={32} className="opacity-50" />
                              </button>
                            </div>
                            <div className="flex justify-center">
                              <button
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
                              previewFile &&
                                previewFile.size > ONE_MEGA_BYTE * 4
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
                              previewFile &&
                                previewFile.size > ONE_MEGA_BYTE * 4
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
            </div>
          </div>

          {/* モード */}
          <div className="space-y-2">
            {/* モード ラベル */}
            <div className="ml-1">
              <h3 className="text-sm font-semibold tracking-wide w-fit">
                モード選択
              </h3>
            </div>

            {/* <div className="flex space-x-5"> */}
            <div className="flex flex-col max-xs:space-y-5 xs:flex-row xs:space-x-5">
              {/* <div className="flex max-xs:flex-col max-xs:space-y-4 max-xs:items-center xs:space-x-5"> */}
              {/* 左 ライト */}
              <label
                htmlFor={`${modeId}-light`}
                className="relative xs:flex-1 h-20 rounded-md cursor-pointer"
              >
                <input
                  type="radio"
                  name="mode"
                  id={`${modeId}-light`}
                  defaultChecked={custom?.mode === "LIGHT"}
                  // onChange={(e) => setMode(e.target.value)}
                  onChange={handleChangeMode}
                  value="LIGHT"
                  className="peer/light absolute top-3 right-4 outline-none appearance-none w-4 h-4 rounded-full border border-stone-300 checked:border-[5px] checked:border-cocoa-400 transition-all duration-100 cursor-pointer"
                />
                <div
                  className={clsx(
                    "h-full rounded-md ring-1 ring-stone-300 peer-[:is(:hover,:focus-visible)]/light:shadow-md transition peer-checked/light:ring-2 peer-checked/light:ring-cocoa-300 peer-checked/light:bg-cocoa-100/30 peer-checked/light:text-cocoa-700 flex flex-col space-y-2 justify-center pl-5"
                  )}
                >
                  {/* <p className="font-semibold text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.4)]"> */}
                  <p className="font-semibold">ライトモード</p>
                  <p className="text-xs break-all line-clamp-1">
                    明るい背景画像に向いています。
                  </p>
                </div>
              </label>

              {/* 右 ダーク */}
              <label
                htmlFor={`${modeId}-dark`}
                className="relative xs:flex-1 h-20 rounded-md cursor-pointer"
              >
                <input
                  type="radio"
                  name="mode"
                  id={`${modeId}-dark`}
                  defaultChecked={custom?.mode === "DARK"}
                  // onChange={(e) => setMode(e.target.value)}
                  onChange={handleChangeMode}
                  value="DARK"
                  className="peer/dark absolute top-3 right-4 outline-none appearance-none w-4 h-4 rounded-full border border-stone-300 checked:border-[5px] checked:border-cocoa-400 transition-all duration-100 cursor-pointer"
                />
                <div
                  className={clsx(
                    "h-full rounded-md ring-1 ring-stone-300 peer-[:is(:hover,:focus-visible)]/dark:shadow-md transition peer-checked/dark:ring-2 peer-checked/dark:ring-cocoa-300 peer-checked/dark:bg-cocoa-100/30 peer-checked/light:text-cocoa-700 flex flex-col space-y-2 justify-center pl-5"
                  )}
                >
                  <p className="font-semibold text-base-black">ダークモード</p>
                  <p className="text-xs text-black/70 break-all line-clamp-1">
                    暗い背景画像に向いています。
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Customize.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Customize;
