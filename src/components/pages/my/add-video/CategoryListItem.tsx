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
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaExclamationTriangle } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";

import { Schema } from "#/pages/my/add-video";
import { VideoList } from "#/components/pages/my/add-video";

type Props = {
  control: Control<Schema>;
  register: UseFormRegister<Schema>;
  setValue: UseFormSetValue<Schema>;
  getValues: UseFormGetValues<Schema>;
  errors: Partial<FieldErrorsImpl<Schema>>;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  categoryField: FieldArrayWithId<Schema, "youtube", "id">;
  index: number;
  categoryFieldsLength: number;
};

export const CategoryListItem: React.FC<Props> = ({
  categoryField,
  index,
  categoryFieldsLength,
  move: moveCategory,
  remove: removeCategory,
  register,
  errors,
  control,
  ...rest
}) => {
  const {
    fields: videoFields,
    append,
    move,
    remove,
  } = useFieldArray({
    // const videoFieldArrayReturn = useFieldArray({
    name: `youtube.${index}.video`,
    control,
  });

  const moveBelow = (fieldsLength: number, fromIndex: number) => {
    // console.log("fields:\n", fields);
    if (fromIndex === fieldsLength - 1) return;
    moveCategory(fromIndex, fromIndex + 1);
  };

  const moveAbove = (fromIndex: number) => {
    if (fromIndex === 0) return;
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
    <li
      id={categoryField.categoryName}
      key={categoryField.id}
      className="relative group p-4 pt-9 bg-primary ring-2 ring-offset-[3px] ring-secondary hover:ring-accent transition-shadow duration-300"
    >
      {/* Button */}
      <div className="absolute top-0 right-0 flex space-x-[3px]">
        {/* Move Collection Button */}
        <div className="flex space-x-[3px]">
          {/* Move Down Collection Button */}
          <button
            type="button"
            onClick={() => moveBelow(categoryFieldsLength, index)}
            disabled={index === categoryFieldsLength - 1}
            className="ring-[3px] ring-white bg-accent group/down outline-none disabled:cursor-not-allowed disabled:bg-secondary"
          >
            <VscTriangleDown
              size={24}
              className="text-white transition-transform pointer-events-none -translate-y-px group-[:enabled:is(:hover,:focus-visible)]/down:animate-moveDownArrow"
            />
          </button>

          {/* Move Up Collection Button */}
          <button
            type="button"
            onClick={() => moveAbove(index)}
            disabled={index === 0}
            className="ring-[3px] ring-white bg-accent group/up outline-none disabled:cursor-not-allowed disabled:bg-secondary"
          >
            <VscTriangleUp
              size={24}
              className="text-white transition-transform pointer-events-none translate-y-px group-[:enabled:is(:hover,:focus-visible)]/up:animate-moveUpArrow"
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
            form="video-form"
            placeholder="&nbsp;"
            {...register(`youtube.${index}.categoryName` as const)}
            className="peer absolute top-0 left-0 w-full h-full bg-transparent z-10 px-3 focus-visible:outline-none"
          />

          {/* Collection Label */}
          <div
            // id="placeholder"
            className="absolute top-3 left-3 text-sm text-base-black/60 transition-all duration-300 pointer-events-none flex items-center space-x-1.5 peer-[:is(:focus-visible,:not(:placeholder-shown))]:-top-[25px] peer-[:is(:focus-visible,:not(:placeholder-shown))]:left-0 peer-[:is(:focus-visible,:not(:placeholder-shown))]:text-base-black"
          >
            <BsFillCollectionPlayFill />
            <span>Collection</span>
          </div>

          {/* Float Background */}
          <div
            // id="line"
            className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary pointer-events-none transition-[height,box-shadow] duration-300 peer-[:is(:focus-visible,:not(:placeholder-shown))]:h-full peer-[:is(:focus-visible,:not(:placeholder-shown),:hover:not(:placeholder-shown))]:ring-2 peer-[:is(:focus-visible,:not(:placeholder-shown),:hover:not(:placeholder-shown))]:ring-offset-[3px] peer-[:is(:focus-visible,:hover:not(:placeholder-shown),:focus-visible:not(:placeholder-shown))]:ring-accent peer-[:not(:placeholder-shown)]:ring-secondary"
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

      <VideoList {...{ videoFields, index, move, remove, ...rest }}></VideoList>

      {/* コレクション内のvideoが重複している場合のエラーメッセージ */}
      {errors.youtube && errors.youtube[index]?.video?.message && (
        <div className="mt-2 px-1 flex items-center space-x-1.5 text-red-600">
          <FaExclamationTriangle />
          <p className="text-sm line-clamp-1 break-all">
            {errors.youtube[index]?.video?.message}
          </p>
        </div>
      )}

      {/* Add Video Button */}
      {categoryFieldsLength < 6 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={appendVideo}
            className="group/addVideoButton flex items-center space-x-1 py-1 pl-1 pr-2 bg-accent text-white outline-none ring-2 ring-offset-[3px] ring-secondary transition-shadow duration-300 [&:is(:hover,:focus-visible)]:ring-accent"
          >
            <span className="relative">
              <RiAddLine
                size={24}
                className="absolute group-[:is(:hover,:focus-visible)]/addVideoButton:animate-myPing"
              />
              <RiAddLine size={24} className="" />
            </span>
            <span className="text-sm">Add Video</span>
          </button>
        </div>
      )}
    </li>
  );
};
