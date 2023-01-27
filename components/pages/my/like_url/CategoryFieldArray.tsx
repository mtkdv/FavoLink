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
import {
  VscChevronDown,
  VscChevronUp,
  VscTriangleDown,
  VscTriangleUp,
} from "react-icons/vsc";
import { RxExclamationTriangle } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { FaExclamationTriangle, FaWindowClose } from "react-icons/fa";
import clsx from "clsx";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { RiAddLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

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

    // scrollBottom();
  };

  const scrollBottom = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const scrollElement = document.querySelector("#scroll-element");
    const scrollTarget = document.querySelector("#scroll-target");
    const bottom = scrollTarget?.getBoundingClientRect().bottom!;
    scrollElement?.scrollTo({
      left: 0,
      top: bottom,
      behavior: "smooth",
    });
  };

  const removeCategory = (index: number) => {
    remove(index);
  };

  return (
    <>
      {/* <ul className="space-y-8 mb-8"> */}
      <ul id="target-ul" className="space-y-8">
        {fields.map((field, index) => (
          /* Collection List */
          <li
            id={field.categoryName}
            key={field.id}
            className="relative group p-4 pt-9 bg-primary ring-2 ring-offset-[3px] ring-secondary hover:ring-accent transition-shadow duration-300"
          >
            {/* Button */}
            <div className="absolute top-0 right-0 flex space-x-[3px]">
              {/* Move Collection Button */}
              <div className="flex space-x-[3px]">
                <button
                  type="button"
                  onClick={() => moveBelow(fields, index)}
                  disabled={index === fields.length - 1}
                  className={clsx(
                    "ring-[3px] ring-white group/down outline-none",
                    index === fields.length - 1
                      ? "cursor-not-allowed bg-secondary"
                      : "bg-accent"
                  )}
                >
                  <VscTriangleDown
                    size={24}
                    className={clsx(
                      "text-white transition-transform pointer-events-none -translate-y-px",
                      index === fields.length - 1
                        ? ""
                        : "group-[:is(:hover,:focus-visible)]/down:animate-moveDownArrow"
                    )}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => moveAbove(index)}
                  disabled={index === 0}
                  className={clsx(
                    "ring-[3px] ring-white group/up outline-none",
                    index === 0
                      ? "cursor-not-allowed bg-secondary"
                      : "bg-accent"
                  )}
                >
                  <VscTriangleUp
                    size={24}
                    className={clsx(
                      "text-white transition-transform pointer-events-none translate-y-px",
                      index === 0
                        ? ""
                        : "group-[:is(:hover,:focus-visible)]/up:animate-moveUpArrow"
                    )}
                  />
                </button>
              </div>

              {/* Remove Collection Button */}
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="bg-accent outline-none ring-[3px] ring-white [&:is(:hover,:focus-visible)]:bg-red-600 transition-colors duration-300"
              >
                <IoMdClose size={24} className="text-white" />
              </button>
            </div>

            {/* Collection Inputs & Errors */}
            <div className="space-y-2 mb-5">
              {/* Collection Inputs */}
              <div className="relative h-10">
                {/* Collection Input */}
                <input
                  form="save-video"
                  placeholder="&nbsp;"
                  {...register(`youtube.${index}.categoryName` as const)}
                  className={clsx(
                    "peer absolute top-0 left-0 w-full h-full bg-transparent z-10 px-3 focus-visible:outline-none"
                  )}
                />

                {/* Collection Label */}
                <div
                  // id="placeholder"
                  className={clsx(
                    "absolute top-3 left-3 text-sm text-base-black/60 transition-all duration-300 pointer-events-none",
                    "flex items-center space-x-1.5",
                    "peer-[:is(:focus-visible,:not(:placeholder-shown))]:-top-[25px] peer-[:is(:focus-visible,:not(:placeholder-shown))]:left-0 peer-[:is(:focus-visible,:not(:placeholder-shown))]:text-base-black"
                  )}
                >
                  <BsFillCollectionPlayFill />
                  <span>Collection</span>
                </div>

                {/* Float Background */}
                <div
                  // id="line"
                  className={clsx(
                    "absolute inset-x-0 bottom-0 h-0.5 bg-secondary pointer-events-none transition-[height,box-shadow] duration-300",
                    "peer-[:is(:focus-visible,:not(:placeholder-shown))]:h-full",
                    "peer-[:is(:focus-visible,:not(:placeholder-shown),:hover:not(:placeholder-shown))]:ring-2 peer-[:is(:focus-visible,:not(:placeholder-shown),:hover:not(:placeholder-shown))]:ring-offset-[3px] peer-[:is(:focus-visible,:hover:not(:placeholder-shown),:focus-visible:not(:placeholder-shown))]:ring-accent",
                    "peer-[:not(:placeholder-shown)]:ring-secondary"
                  )}
                ></div>
              </div>

              {/* Collection Errors */}
              {errors.youtube && errors.youtube[index]?.categoryName && (
                <div className="px-1 flex items-center space-x-1.5 text-red-600">
                  <FaExclamationTriangle />
                  <p className="text-sm line-clamp-1 break-all">
                    {errors.youtube[index]?.categoryName?.message}
                  </p>
                </div>
              )}
            </div>

            {/* FIXME: setValueとgetValuesの梯子 */}
            <VideoFieldArray
              {...{ control, index, setValue, getValues, errors }}
            />
          </li>
        ))}
      </ul>

      {/* Error Message（コレクション名の重複など） */}
      {errors.youtube && errors.youtube.message && (
        <div className="mt-4 px-1 flex items-center space-x-1.5 text-red-600">
          <FaExclamationTriangle />
          <p className="text-sm line-clamp-1 break-all">
            {errors.youtube.message}
          </p>
        </div>
      )}

      {/* Add Collection Button */}
      {fields.length < 5 && (
        <div
          id="addCollectionButtonWrapper"
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={() => appendCategory(fields)}
            className="group/addCollectionButton flex items-center space-x-1 py-1 pl-1 pr-2 bg-accent text-white outline-none ring-2 ring-offset-[3px] ring-secondary transition-shadow duration-300 [&:is(:hover,:focus-visible)]:ring-accent"
          >
            <span className="relative">
              <RiAddLine
                size={24}
                className="absolute group-[:is(:hover,:focus-visible)]/addCollectionButton:animate-myPing"
              />
              <RiAddLine size={24} className="" />
            </span>
            <span className="text-sm">Add Collection</span>
          </button>
        </div>
      )}
    </>
  );
};
