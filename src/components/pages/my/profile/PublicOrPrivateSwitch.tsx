import { useChangePublished } from "#/hooks/useChangePublished";
import { useGetProfile } from "#/hooks/useGetProfile";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export const PublicOrPrivateSwitch = () => {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);
  const { mutateAsync } = useChangePublished();
  const [checked, setChecked] = useState(profile?.published);

  const handleChange = async () => {
    if (session === null || session.user === undefined) return;
    const { id } = session.user;

    setChecked((current) => !current);

    const data = {
      published: !checked,
    };

    mutateAsync(
      { id, data },
      {
        onSuccess: (data) => {
          toast.success(
            data.published ? "公開しました。" : "非公開にしました。"
          );
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

  return profile ? (
    // <div className="group/pub-pri-switch flex space-x-2">
    <div className="flex justify-between">
      <div className="flex flex-col items-end">
        <h3 className="">ページの公開設定</h3>
        <p className="text-xs">
          現在の状態：
          {checked ? (
            <span className="text-cocoa-400">公開中</span>
          ) : (
            <span className="text-stone-400">非公開</span>
          )}
        </p>
      </div>
      <div className="flex items-center">
        <label htmlFor="published">
          <input
            type="checkbox"
            id="published"
            checked={checked}
            onChange={handleChange}
            className="sr-only"
          />
          {/* FIXME: スイッチの見た目変更 */}
          <div
            className={clsx(
              "h-6 w-11 rounded-full flex items-center cursor-pointer transition-colors",
              // checked ? "bg-blue-600" : "bg-gray-200"
              checked ? "bg-cocoa-400" : "bg-gray-200"
              // "group-[:has(input:checked)]/pub-pri-switch:bg-blue-600 group-[:has(input:not(:checked))]/pub-pri-switch:bg-gray-200"
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
  ) : null;
};
