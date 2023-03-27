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
import { useQuery } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";
import { FaExclamationTriangle } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { TfiExchangeVertical } from "react-icons/tfi";

import { Schema } from "#/pages/my/add-video";
import { Accordion, LinkListItem } from "#/components/pages/my/add-video";
import { queryKeys } from "#/const";
import { Spacer } from "#/components/uiParts";
import { useLayoutAnimation } from "#/hooks";
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
      className="relative group/collection-item px-3 py-6 rounded-lg border border-stone-300 hover:border-stone-400 bg-white/80"
    >
      {/* Move Category Up Down */}
      {categoryIndex !== 0 && (
        <button
          type="button"
          onClick={() => swapCategory(categoryIndex)}
          className="absolute group/swap z-10 left-1/2 -translate-x-1/2 bottom-full translate-y-1 rounded-sm border border-cocoa-300 shadow p-1 bg-white [&:is(:hover,:focus-visible)]:bg-cocoa-300 transition duration-300"
        >
          <TfiExchangeVertical
            size={24}
            className="text-cocoa-300 group-[:is(:hover,:focus-visible)]/swap:text-white transition duration-300"
          />
        </button>
      )}

      {/* Remove Collection Button */}
      <button
        type="button"
        onClick={() => removeCategory(categoryIndex)}
        className="absolute right-2 top-2 group/remove outline-none focus-visible:ring-2 ring-red-300"
      >
        <IoMdClose
          size={24}
          className="text-stone-400 group-[:is(:hover,:focus-visible)]/remove:text-red-400 group-focus-visible/remove:opacity-100 transition duration-300 opacity-0 group-hover/collection-item:opacity-100"
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
            <span className="ml-1 text-xs text-cocoa-800 font-semibold tracking-wide">
              Category Title
            </span>
            <span className="text-cocoa-800 group-[:has(.error-message)]/collection-inputs-errors:text-red-600 leading-none">
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
              className="peer w-full h-full p-3 pr-14 bg-white/50 outline-none text-stone-800 tracking-wider border border-stone-300 [&:is(:focus-visible,:hover)]:border-cocoa-300 focus-visible:shadow-[0_0_3px_2px_rgba(230,189,173,0.4)] transition group-[:has(.error-message)]/collection-inputs-errors:ring-red-600 group-[:has(.error-message)]/collection-inputs-errors:shadow-red-200 rounded-sm"
            />

            {/* Collection Placeholder */}
            <p className="absolute top-1/2 -translate-y-1/2 left-3 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
              Category
            </p>

            {/* Character Count */}
            {/* FIXME: controlの型 */}
            {/* TODO: 値は仮 */}
            <div className="absolute top-1/2 -translate-y-1/2 right-3 opacity-0 text-xxs text-stone-500 peer-[:is(:focus-visible,:not(:placeholder-shown))]:opacity-100 group-[:has(.error-message)]/collection-inputs-errors:opacity-100 transition-opacity duration-300">
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
          <div className="px-1 flex items-center space-x-1.5 text-red-600">
            <FaExclamationTriangle />
            <p className="text-sm line-clamp-1 break-all">
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
              <div className="px-1 flex items-center space-x-1.5 text-red-600">
                <FaExclamationTriangle />
                <p className="text-sm line-clamp-1 break-all">
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
                className="group/add-video-button flex items-center rounded-lg space-x-1 py-2 pl-1.5 pr-2.5 bg-cocoa-100 outline-none text-cocoa-600 border border-cocoa-100 transition duration-300 [&:is(:hover,:focus-visible)]:bg-cocoa-200 shadow-sm"
              >
                <span className="relative">
                  <RiAddLine
                    size={24}
                    className="absolute group-[:is(:hover,:focus-visible)]/add-video-button:animate-myPing"
                  />
                  <RiAddLine size={24} className="" />
                </span>
                <span className="text-sm font-medium tracking-wider">
                  Add Video
                </span>
              </button>
            </div>
          </>
        )}
      </Accordion>
    </li>
  );
};
