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
import { motion } from "framer-motion";

import { Schema } from "#/pages/my/add-video";
import { LinkListItem } from "#/components/pages/my/add-video";
import { queryKeys } from "#/const";
// import { InputCounter } from "#/components/pages/my/profile/InputCounter";

type Props = {
  control: Control<Schema>;
  register: UseFormRegister<Schema>;
  setValue: UseFormSetValue<Schema>;
  getValues: UseFormGetValues<Schema>;
  errors: Partial<FieldErrorsImpl<Schema>>;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  categoryField: FieldArrayWithId<Schema, "videos", "id">;
  categoryIndex: number;
  categoryFieldsLength: number;
};

export const CategoryListItem: React.FC<Props> = ({
  categoryField,
  categoryIndex,
  categoryFieldsLength,
  move: moveCategory,
  remove: removeCategory,
  register,
  errors,
  control,
  ...rest
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

  return (
    <motion.li
      layout
      id={categoryField.categoryName}
      key={categoryField.id}
      className="relative group/collection-item px-3 py-6 rounded-md ring-1 ring-stone-300 flex flex-col shadow-[0_0_3px_1px] shadow-isabelline hover:ring-stone-400 bg-base-white/80"
    >
      {/* Move Category Up Down */}
      {categoryIndex === 0 || (
        <button
          type="button"
          onClick={() => swapCategory(categoryIndex)}
          className="absolute group/swap z-10 left-1/2 -translate-x-1/2 bottom-full translate-y-1 rounded-sm ring-1 ring-tonys-pink shadow p-1 bg-white [&:is(:hover,:focus-visible)]:bg-tonys-pink transition duration-300"
        >
          <TfiExchangeVertical
            size={24}
            className="text-tonys-pink group-[:is(:hover,:focus-visible)]/swap:text-white transition duration-300"
          />
        </button>
      )}

      {/* Remove Collection Button */}
      <button
        type="button"
        onClick={() => removeCategory(categoryIndex)}
        className="absolute right-2 top-2 group/remove outline-none"
      >
        <IoMdClose
          size={24}
          className="text-stone-400 group-[:is(:hover,:focus-visible)]/remove:text-[#222222] transition duration-300 opacity-0 group-hover/collection-item:opacity-100"
        />
      </button>

      {/* Collection Inputs & Errors */}
      <div className="group/collection-inputs-errors">
        {/* Collection Inputs */}
        <div className="space-y-2">
          {/* Collection Label */}
          <label
            // htmlFor={`collection-input-${categoryIndex}`}
            htmlFor={categoryInputId}
            className="flex w-fit"
          >
            <span className="ml-1 text-xs text-stone-600 font-semibold tracking-wide">
              Category Title
            </span>
            <span className="text-stone-600 group-[:has(.error-message)]/collection-inputs-errors:text-red-600 leading-none">
              *
            </span>
          </label>

          {/* Collection Input, Placeholder, Counter */}
          <div className="relative h-10">
            {/* Collection input */}
            <input
              form={formId}
              id={categoryInputId}
              placeholder="&nbsp;"
              type="text"
              {...register(`videos.${categoryIndex}.categoryName` as const)}
              className="peer w-full h-full p-3 pr-14 bg-white/50 outline-none text-stone-800 text-base tracking-wider ring-1 ring-stone-300 [&:is(:focus-visible,:hover)]:ring-tonys-pink focus-visible:shadow-[0_0_3px_2px_rgba(230,189,173,0.4)] transition group-[:has(.error-message)]/collection-inputs-errors:ring-red-600 group-[:has(.error-message)]/collection-inputs-errors:shadow-red-200 rounded-sm"
            />

            {/* Collection Placeholder */}
            <p className="absolute top-1/2 -translate-y-1/2 left-3 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0">
              Collection
            </p>

            {/* Character Count */}
            {/* FIXME: controlの型 */}
            {/* TODO: 値は仮 */}
            <div className="absolute top-1/2 -translate-y-1/2 right-3 opacity-0 text-xxs text-stone-500 peer-[:is(:focus-visible,:not(:placeholder-shown))]:opacity-100 group-[:has(.error-message)]/collection-inputs-errors:opacity-100 transition-opacity duration-300">
              {/* <InputCounter
                    name={`youtube.${index}.categoryName`}
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

      {linkFields.length ? (
        <motion.ul layout className="mt-6 space-y-4">
          {linkFields.map((linkField, linkIndex) => (
            <LinkListItem
              key={linkField.id}
              {...{ categoryIndex, linkIndex, move, remove, ...rest }}
            />
          ))}
        </motion.ul>
      ) : null}

      {/* コレクション内のvideoが重複している場合のエラーメッセージ */}
      {errors.videos &&
        errors.videos[categoryIndex]?.categoryLinks?.message && (
          <div className="mt-2 px-1 flex items-center space-x-1.5 text-red-600">
            <FaExclamationTriangle />
            <p className="text-sm line-clamp-1 break-all">
              {errors.videos[categoryIndex]?.categoryLinks?.message}
            </p>
          </div>
        )}

      {/* Add Video Button */}
      {linkFields.length < 6 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={appendVideo}
            className="group/add-video-button flex items-center rounded-sm space-x-1 p-1 pr-2 bg-white outline-none text-tonys-pink ring-1 ring-tonys-pink transition duration-300 [&:is(:hover,:focus-visible)]:bg-tonys-pink [&:is(:hover,:focus-visible)]:text-white shadow-sm"
          >
            <span className="relative">
              <RiAddLine
                size={24}
                className="absolute group-[:is(:hover,:focus-visible)]/add-video-button:animate-myPing"
              />
              <RiAddLine size={24} className="" />
            </span>
            <span className="text-sm">Add Video</span>
          </button>
        </div>
      )}
    </motion.li>
  );
};
