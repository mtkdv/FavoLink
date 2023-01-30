import { useChangePublished } from "#/lib/useChangePublished";
import { useGetProfile } from "#/lib/useGetProfile";
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
    <div className="flex space-x-2">
      <p>
        現在の状態は<span>{checked ? "公開中" : "非公開"}</span>
        です
      </p>
      <input
        type="checkbox"
        id="published"
        checked={checked}
        onChange={handleChange}
        className="hidden"
      />
      <label htmlFor="published" className="flex space-x-2">
        <div
          className={clsx(
            "h-6 w-11 rounded-full flex items-center cursor-pointer transition-colors",
            checked ? "bg-blue-600" : "bg-gray-200"
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
  ) : null;
};
