export const CustomizeSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-3xl animate-appearance animate-loadingPulse flex-col space-y-6">
      {/* Header */}
      <div className="sticky top-0 z-30 flex h-16 flex-col justify-end bg-base-white">
        <div className="space-y-2 px-4">
          <div className="relative">
            <div className="absolute bottom-0 right-2 flex justify-end">
              {/* Save Button */}
              <div className="h-full">
                <div className="relative h-11 w-28 rounded-md bg-isabelline/75" />
              </div>
            </div>

            {/* ページタイトル */}
            <h2 className="ml-2 h-7 w-28 rounded-full bg-isabelline/75" />
          </div>

          {/* Divider */}
          <div className="mx-auto h-0.5 w-full rounded-full bg-isabelline/75" />
        </div>
      </div>

      {/* Main */}
      <div className="space-y-12 px-6 py-10">
        <div className="flex flex-col space-y-12">
          {/* ページ背景 */}
          <div className="space-y-2">
            {/* ページ背景 ラベル */}
            <div className="ml-1">
              <h3 className="h-5 w-18 rounded-full bg-isabelline/75" />
            </div>

            <div className="rounded-md border-2 border-isabelline/75 pb-6">
              {/* 上、タブ */}
              <div className="h-8" />

              {/* 下 */}
              <div>
                {/* 画像プレビュー */}
                <div className="flex px-5 py-6 max-sm:flex-col max-sm:items-center max-sm:space-y-4 sm:space-x-10">
                  {/* 左 現在設定中の画像 */}
                  <div className="w-full">
                    <div className="flex justify-center">
                      <div className="aspect-[2/3] bg-isabelline/75 max-sm:w-60 max-sm:min-w-[160px] sm:w-full" />
                    </div>
                    <div className="mt-2 h-5" />
                  </div>

                  {/* 右 アップロード */}
                  <div className="w-full">
                    <div className="flex justify-center">
                      <div className="aspect-[2/3] bg-isabelline/75 max-sm:w-60 max-sm:min-w-[160px] sm:w-full" />
                    </div>
                    <div className="mt-2 h-5" />
                  </div>
                </div>

                {/* プレビュー詳細 */}
                <div className="px-5">
                  {/* ラベル */}
                  <div className="h-6 w-16 rounded-t-md bg-isabelline/75" />

                  {/* フレーム */}
                  <div className="h-[157px] w-full rounded-b-md rounded-tr-md bg-isabelline/75" />
                </div>
              </div>
            </div>
          </div>

          {/* モード */}
          <div className="space-y-2">
            {/* モード ラベル */}
            <div className="ml-1">
              <h3 className="h-5 w-18 rounded-full bg-isabelline/75" />
            </div>

            <div className="flex flex-col max-xs:space-y-5 xs:flex-row xs:space-x-5">
              {/* 左 ライト */}
              <div className="h-20 rounded-md bg-isabelline/75 xs:flex-1" />

              {/* 右 ダーク */}
              <div className="h-20 rounded-md bg-isabelline/75 xs:flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
