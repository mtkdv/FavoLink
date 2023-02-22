export const CustomizeSkeleton = () => {
  return (
    <div className="px-6 py-4 space-y-12 animate-loadingPulse">
      <div className="flex flex-col space-y-12">
        {/* ページ背景 */}
        <div className="space-y-2">
          {/* ページ背景 ラベル */}
          <div className="ml-1">
            <h3 className="w-18 h-5 rounded-full bg-isabelline/75" />
          </div>

          <div className="pb-6 rounded-md border-2 border-isabelline/75">
            {/* 上、タブ */}
            <div className="h-8" />

            {/* 下 */}
            <div>
              {/* 画像プレビュー */}
              <div className="flex max-sm:flex-col max-sm:items-center max-sm:space-y-4 sm:justify-around md:justify-between px-9 py-6">
                {/* 左 現在設定中の画像 */}
                <div className="space-y-2 w-full">
                  <div className="flex justify-center">
                    <div className="max-sm:w-60 max-sm:min-w-[160px] sm:w-40 aspect-[2/3] bg-isabelline/75" />
                  </div>
                  <div className="h-5" />
                </div>

                {/* 右 アップロード */}
                <div className="w-full">
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      <div className="max-sm:w-60 max-sm:min-w-[160px] sm:w-40 aspect-[2/3] bg-isabelline/75" />
                    </div>
                    <div className="mt-2 h-5" />
                  </div>
                </div>
              </div>

              {/* プレビュー詳細 */}
              <div className="px-5">
                {/* ラベル */}
                <div className="w-16 h-6 rounded-t-md bg-isabelline/75" />

                {/* フレーム */}
                <div className="w-full h-[157px] rounded-tr-md rounded-b-md bg-isabelline/75" />
              </div>
            </div>
          </div>
        </div>

        {/* モード */}
        <div className="space-y-2">
          {/* モード ラベル */}
          <div className="ml-1">
            <h3 className="w-18 h-5 rounded-full bg-isabelline/75" />
          </div>

          <div className="flex space-x-5">
            {/* 左 ライト */}
            <div className="flex-1 h-20 rounded-md bg-isabelline/75" />

            {/* 右 ダーク */}
            <div className="flex-1 h-20 rounded-md bg-isabelline/75" />
          </div>
        </div>
      </div>
    </div>
  );
};
