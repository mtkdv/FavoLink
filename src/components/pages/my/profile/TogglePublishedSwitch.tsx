import React, { useEffect, useId, useState } from "react";
import { toast } from "react-hot-toast";
import clsx from "clsx";

import { useGetProfilePublished, usePatchProfilePublished } from "#/hooks";

export const TogglePublishedSwitch = React.memo(() => {
  const inputId = useId();
  const { data: profile, isLoading } = useGetProfilePublished();
  const { mutateAsync } = usePatchProfilePublished();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (profile === undefined) return;
    setChecked(profile.published);
  }, [profile]);

  const handleChange = async () => {
    setChecked((current) => !current);

    const data = {
      published: !checked,
    };

    mutateAsync(data, {
      onSuccess: (data) => {
        toast.success(data.published ? "公開しました。" : "非公開にしました。");
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return isLoading ? null : (
    <div className="flex justify-between">
      <div className="flex flex-col items-end">
        <h3 className="">ページの公開設定</h3>
        <p className="text-xs">
          現在の状態：
          {checked ? (
            <span className="text-teal-700">公開中</span>
          ) : (
            <span className="text-stone-400">非公開</span>
          )}
        </p>
      </div>
      <div className="flex items-center">
        <label htmlFor={inputId}>
          <input
            type="checkbox"
            id={inputId}
            checked={checked}
            onChange={handleChange}
            className="sr-only peer"
          />
          {/* FIXME: スイッチのデザイン変更 */}
          <div
            className={clsx(
              "h-6 w-11 rounded-full flex items-center cursor-pointer transition duration-300 peer-focus-visible:ring-2 ring-juniper-500 ring-offset-1",
              checked ? "bg-teal-600" : "bg-gray-200"
            )}
          >
            <div
              className={clsx(
                "h-4 w-4 rounded-full bg-white transition",
                checked ? "translate-x-6" : "translate-x-1"
              )}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
});
