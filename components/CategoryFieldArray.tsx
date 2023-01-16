import { Schema } from "#/pages/my/like_url";
import React, { FC } from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrorsImpl,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { VideoFieldArray } from "./VideoFieldArray";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { RxExclamationTriangle } from "react-icons/rx";
import { toast } from "react-hot-toast";

type Props = {
  control: Control<Schema>;
  register: UseFormRegister<Schema>;
  setValue: UseFormSetValue<Schema>;
  getValues: UseFormGetValues<Schema>;
  errors: Partial<FieldErrorsImpl<Schema>>;
};

export const CategoryFieldArray: FC<Props> = ({
  control,
  register,
  setValue,
  getValues,
  errors,
}) => {
  const { fields, append, move, remove } = useFieldArray({
    name: "youtube",
    control,
  });

  const moveAbove = (fromIndex: number) => {
    if (fromIndex === 0) return;
    move(fromIndex, fromIndex - 1);
  };

  const moveBelow = (
    fields: FieldArrayWithId<Schema, "youtube", "id">[],
    fromIndex: number
  ) => {
    // console.log("fields:\n", fields);
    if (fromIndex === fields.length - 1) return;
    move(fromIndex, fromIndex + 1);
  };

  const appendCategory = (
    fields: FieldArrayWithId<Schema, "youtube", "id">[]
  ) => {
    if (fields.length === 5) {
      toast.error("追加できるカテゴリーは５つまでです。");
      return;
    }
    append({ categoryId: "", categoryName: "", video: [] });
  };

  const removeCategory = (index: number) => {
    remove(index);
  };

  return (
    <>
      <ul>
        {fields.map((field, index) => (
          <li key={field.id} className="mb-4 p-4 border border-white">
            <div className="flex">
              <div className="flex flex-col">
                <button type="button" onClick={() => moveAbove(index)}>
                  <VscChevronUp size={`1.5rem`} />
                </button>
                <button type="button" onClick={() => moveBelow(fields, index)}>
                  <VscChevronDown size={`1.5rem`} />
                </button>
              </div>
              <input
                type="hidden"
                {...register(`youtube.${index}.categoryId` as const)}
              />
              <input
                placeholder="Category"
                {...register(`youtube.${index}.categoryName` as const)}
                className="py-1 px-2 w-96 border border-white outline-none bg-transparent"
              />
              {errors.youtube && errors.youtube[index]?.categoryName && (
                <div className="text-red-500 flex space-x-1.5">
                  <RxExclamationTriangle className="relative top-[5px]" />
                  <p>{errors.youtube[index]?.categoryName?.message}</p>
                </div>
              )}
              <button type="button" onClick={() => removeCategory(index)}>
                remove
              </button>
            </div>
            {/* FIXME: setValueとgetValuesの梯子 */}
            <VideoFieldArray
              {...{ control, index, setValue, getValues, errors }}
            />
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => appendCategory(fields)}>
        Add a Category
      </button>
    </>
  );
};
