import { useQuery } from "@tanstack/react-query";
import { useId } from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrorsImpl,
  useFieldArray,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiAddLine } from "react-icons/ri";
import { TfiExchangeVertical } from "react-icons/tfi";

import { Accordion, LinkListItem } from "#/components/pages/my/add-video";
import { Spacer } from "#/components/uiParts";
import { queryKeys } from "#/const";
import { useLayoutAnimation } from "#/hooks";
import { Schema } from "#/pages/my/add-video";
// import { InputCounter } from "#/components/pages/my/profile/InputCounter";

export const CategoryListItem = ({
  categoryField,
  categoryIndex,
  categoryFieldsLength,
  move: moveCategory,
  remove: removeCategory,
  register,
  errors,
  control,
  ...rest
}: {
  categoryField: FieldArrayWithId<Schema, "videos", "id">;
  categoryIndex: number;
  categoryFieldsLength: number;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<Schema>;
  errors: Partial<FieldErrorsImpl<Schema>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Schema, any>;
  getValues: UseFormGetValues<Schema>;
  setValue: UseFormSetValue<Schema>;
}) => {
  const categoryInputId = useId();

  const { data: formId } = useQuery<string>({
    queryKey: queryKeys.form.addVideo,
    initialData: "",
    enabled: false,
  });

  const {
    fields: linkFields,
    append,
    move,
    remove,
  } = useFieldArray({
    name: `videos.${categoryIndex}.categoryLinks`,
    control,
  });

  const swapCategory = (fromIndex: number) => {
    moveCategory(fromIndex, fromIndex - 1);
  };

  const appendVideo = () => {
    append({
      id: "",
      videoId: "",
      title: "",
      thumbnailUrl: "",
      channelTitle: "",
      channelId: "",
      channelThumbnailUrl: "",
    });
  };

  // Layout Animation
  const { liRef } = useLayoutAnimation(categoryIndex);

  return (
    <li
      ref={liRef}
      // ref={(ele) => {
      //   if (!ele) return;
      //   const rect = ele.getBoundingClientRect();
      //   if (position.y) {
      //     const deltaY = position.y - rect.top;
      //     animation(ele, deltaY);
      //   }
      //   position.y = rect.top;
      // }}
      id={categoryField.categoryName}
      key={categoryField.id}
      className="group/collection-item relative rounded-lg border border-stone-300 bg-white/80 px-3 py-6 hover:border-stone-400"
    >
      {/* Move Category Up Down */}
      {categoryIndex !== 0 && (
        <button
          type="button"
          onClick={() => swapCategory(categoryIndex)}
          className="group/swap absolute bottom-full left-1/2 z-10 -translate-x-1/2 translate-y-1 rounded-sm border border-juniper-500 bg-white p-1 shadow outline-none transition duration-300 [&:is(:hover,:focus-visible)]:bg-juniper-500"
        >
          <TfiExchangeVertical
            size={24}
            className="text-juniper-500 transition duration-300 group-[:is(:hover,:focus-visible)]/swap:text-white"
          />
        </button>
      )}

      {/* Remove Collection Button */}
      <button
        type="button"
        onClick={() => removeCategory(categoryIndex)}
        className="group/remove absolute right-2 top-2 outline-none ring-red-300 focus-visible:ring-2"
      >
        <IoMdClose
          size={24}
          className="text-stone-400 opacity-0 transition duration-300 group-hover/collection-item:opacity-100 group-focus-visible/remove:opacity-100 group-[:is(:hover,:focus-visible)]/remove:text-red-400"
        />
      </button>

      {/* Collection Inputs & Errors */}
      <div className="group/collection-inputs-errors">
        {/* Collection Inputs */}
        <div>
          {/* Collection Label */}
          <label
            // htmlFor={`collection-input-${categoryIndex}`}
            htmlFor={categoryInputId}
            className="flex w-fit"
          >
            <span className="ml-1 text-xs font-semibold tracking-wide">
              Category Title
            </span>
            <span className="leading-none group-[:has(.error-message)]/collection-inputs-errors:text-red-600">
              *
            </span>
          </label>

          <Spacer size={8} axis="column" />

          {/* Collection Input, Placeholder, Counter */}
          <div className="relative h-10">
            {/* Collection input */}
            <input
              form={formId}
              id={categoryInputId}
              placeholder="&nbsp;"
              type="text"
              {...register(`videos.${categoryIndex}.categoryName` as const)}
              className="peer h-full w-full rounded-sm border border-stone-300 bg-white/50 p-3 pr-14 tracking-wider text-stone-800 outline-none transition focus-visible:shadow-[0_0_2px_1px] focus-visible:shadow-juniper-400 group-[:has(.error-message)]/collection-inputs-errors:shadow-red-200 group-[:has(.error-message)]/collection-inputs-errors:ring-red-600 [&:is(:hover,:focus-visible)]:border-juniper-500"
            />

            {/* Collection Placeholder */}
            <p className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-light tracking-wider text-stone-500 transition duration-300 peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
              Category
            </p>

            {/* Character Count */}
            {/* FIXME: controlの型 */}
            {/* TODO: 値は仮 */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xxs text-stone-500 opacity-0 transition-opacity duration-300 group-[:has(.error-message)]/collection-inputs-errors:opacity-100 peer-[:is(:focus-visible,:not(:placeholder-shown))]:opacity-100">
              {/* <InputCounter
                name={`videos.${categoryIndex}.categoryName`}
                control={control}
                maxLength={30}
              /> */}
              ** / 20
            </div>
          </div>
        </div>

        {/* Collection Errors */}
        {errors.videos && errors.videos[categoryIndex]?.categoryName && (
          <div className="flex items-center space-x-1.5 px-1 text-red-600">
            <FaExclamationTriangle />
            <p className="line-clamp-1 break-all text-sm">
              {errors.videos[categoryIndex]?.categoryName?.message}
            </p>
          </div>
        )}
      </div>

      <Accordion>
        {linkFields.length > 0 && (
          <ul className="space-y-4">
            {linkFields.map((linkField, linkIndex) => (
              <LinkListItem
                key={linkField.id}
                {...{ categoryIndex, linkIndex, move, remove, ...rest }}
              />
            ))}
          </ul>
        )}

        {/* コレクション内のvideoが重複している場合のエラーメッセージ */}
        {errors.videos &&
          errors.videos[categoryIndex]?.categoryLinks?.message && (
            <>
              <Spacer size={8} axis="column" />
              <div className="flex items-center space-x-1.5 px-1 text-red-600">
                <FaExclamationTriangle />
                <p className="line-clamp-1 break-all text-sm">
                  {errors.videos[categoryIndex]?.categoryLinks?.message}
                </p>
              </div>
            </>
          )}

        {/* Add Video Button */}
        {linkFields.length < 6 && (
          <>
            <Spacer size={20} axis="column" />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={appendVideo}
                className="group flex h-11 items-center rounded-lg border border-teal-600 bg-white pl-1.5 pr-3 text-teal-600 outline-none transition duration-300 [&:is(:hover,:focus-visible)]:bg-teal-600 [&:is(:hover,:focus-visible)]:text-white"
              >
                <span className="relative">
                  <RiAddLine
                    size={24}
                    className="absolute group-[:is(:hover,:focus-visible)]:animate-myPing"
                  />
                  <RiAddLine size={24} />
                </span>
                <Spacer size={4} axis="row" />
                <span>Add Video</span>
              </button>
            </div>
          </>
        )}
      </Accordion>
    </li>
  );
};
