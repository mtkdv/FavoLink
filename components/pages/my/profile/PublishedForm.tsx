import {
  ChangePublishedResponse,
  useChangePublished,
} from "#/lib/useChangePublished";
import { useGetProfile } from "#/lib/useGetProfile";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type FormValues = {
  published: boolean;
};

export const PublishedForm = () => {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);
  const { mutateAsync } = useChangePublished();
  const { register, handleSubmit } = useForm<FormValues>({
    values: profile,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log("data.published:", data.published);

    if (session === null || session.user === undefined) return;
    const { id } = session.user;

    const res = (await mutateAsync({ id, data })) as ChangePublishedResponse;

    if (res.type === "success") {
      toast.success(
        res.profile.published ? "公開しました。" : "非公開にしました。"
      );
    } else if (res.type === "error") {
      toast.error(res.message);
    }
  };

  return profile ? (
    <div>
      <p>
        現在の状態は<span>{profile.published ? "公開中" : "非公開"}</span>
        です
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="checkbox" {...register("published")} className="hidden" />
        <button type="submit">
          {profile.published ? "非公開にする" : "公開にする"}
        </button>
      </form>
    </div>
  ) : null;
};
