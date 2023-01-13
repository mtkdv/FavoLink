import { Schema } from "#/pages/my/like_url";
import { FC } from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrorsImpl,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxExclamationTriangle } from "react-icons/rx";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { VideoField } from "./VideoField";

type Props = {
  index: number;
  control: Control<Schema>;
  // register: UseFormRegister<Schema>;
  setValue: UseFormSetValue<Schema>;
  getValues: UseFormGetValues<Schema>;
  errors: Partial<FieldErrorsImpl<Schema>>;
};

export const VideoFieldArray: FC<Props> = ({
  index: nestIndex,
  control,
  // register,
  setValue,
  getValues,
  errors,
}) => {
  const { fields, append, update, move, remove } = useFieldArray({
    name: `youtube.${nestIndex}.video`,
    control,
  });

  const moveAbove = (fromIndex: number) => {
    if (fromIndex === 0) return;
    move(fromIndex, fromIndex - 1);
  };

  const moveBelow = (
    fields: FieldArrayWithId<Schema, `youtube.${number}.video`, "id">[],
    fromIndex: number
  ) => {
    if (fromIndex === fields.length - 1) return;
    move(fromIndex, fromIndex + 1);
  };

  const removeVideo = (index: number) => {
    remove(index);
  };

  const appendVideo = (
    fields: FieldArrayWithId<Schema, `youtube.${number}.video`, "id">[]
  ) => {
    if (fields.length === 5) {
      toast.error("追加できる動画は、カテゴリーごとに５つまでです。");
      return;
    }
    append({ id: "", videoId: "", title: "", thumbnailUrl: "" });
  };

  return (
    <>
      {fields.map((field, index) => (
        <fieldset key={field.id} className="mb-4 p-4 border border-pink-500">
          <div className="flex">
            <div className="flex flex-col">
              <button type="button" onClick={() => moveAbove(index)}>
                <VscChevronUp size={`1.5rem`} />
              </button>
              <button type="button" onClick={() => moveBelow(fields, index)}>
                <VscChevronDown size={`1.5rem`} />
              </button>
            </div>
            <button type="button" onClick={() => removeVideo(index)}>
              remove
            </button>
            <VideoField
              {...{ update, nestIndex, index, setValue, getValues }}
            />
          </div>
        </fieldset>
      ))}
      {/* {errors.youtube && (
        <div className="text-red-500 flex space-x-1.5">
          <RxExclamationTriangle className="relative top-[5px]" />
          <p>{errors.youtube.}</p>
        </div>
      )} */}
      <button type="button" onClick={() => appendVideo(fields)}>
        Add a Video
      </button>
    </>
  );
};
