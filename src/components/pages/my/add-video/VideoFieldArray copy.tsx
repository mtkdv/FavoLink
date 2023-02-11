import { Schema } from "#/pages/my/add-video";
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
import { RiAddLine, RiVideoAddFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { VideoField } from "./VideoField";
import { IoTrash } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaExclamationTriangle } from "react-icons/fa";

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
    if (fields.length === 6) {
      toast.error("追加できる動画は、カテゴリーごとに６つまでです。");
      return;
    }
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
    <>
      {" "}
      <ul className="space-y-6">
        {fields.map((field, index) => (
          <li
            key={field.id}
            // className="ring-2 ring-offset-[3px] ring-secondary bg-secondary hover:ring-accent transition-shadow duration-300"
            className="ring-2 ring-offset-[3px] ring-secondary bg-white hover:ring-accent transition-shadow duration-300"
          >
            {/* Move Video */}
            {/* <div className="absolute flex flex-col -right-5 top-3">
            <button type="button" onClick={() => moveAbove(index)}>
              <VscTriangleUp size={24} className="text-base-black" />
            </button>
            <button
              type="button"
              onClick={() => moveBelow(fields, index)}
              disabled={index === fields.length - 1}
            >
              <VscTriangleDown size={24} className="text-base-black" />
            </button>
          </div> */}

            {/* Remove Video */}
            {/* <div className="absolute -top-2.5 -right-2.5">
            <button
              type="button"
              onClick={() => removeVideo(index)}
              className="grid place-items-center rounded-full bg-accent"
            >
              <IoMdClose size={24} className="text-white" />
            </button>
          </div> */}

            <VideoField
              videoLength={fields.length}
              {...{
                update,
                nestIndex,
                index,
                setValue,
                getValues,
                move,
                remove,
              }}
            />
          </li>
        ))}
      </ul>
      {/* コレクション内のvideoが重複している場合のエラーメッセージ */}
      {errors.youtube && errors.youtube[nestIndex]?.video?.message && (
        <div className="mt-2 px-1 flex items-center space-x-1.5 text-red-600">
          <FaExclamationTriangle />
          <p className="text-sm line-clamp-1 break-all">
            {errors.youtube[nestIndex]?.video?.message}
          </p>
        </div>
      )}
      {/* Add Video Button */}
      {fields.length < 6 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => appendVideo(fields)}
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
      {/* </ul> */}
    </>
  );
};
