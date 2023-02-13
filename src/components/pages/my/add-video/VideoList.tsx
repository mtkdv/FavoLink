import {
  FieldArrayWithId,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

import { Schema } from "#/pages/my/add-video";
import { VideoListItem } from "#/components/pages/my/add-video";

type Props = {
  videoFields: FieldArrayWithId<Schema, `youtube.${number}.video`, "id">[];
  index: number;
  getValues: UseFormGetValues<Schema>;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<Schema>;
};

export const VideoList: React.FC<Props> = ({
  videoFields,
  index: nestIndex,
  ...rest
}) => {
  return (
    <ul className="space-y-4">
      {videoFields.map((videoField, index) => (
        <VideoListItem
          key={videoField.id}
          {...{ nestIndex, index, ...rest }}
        ></VideoListItem>
      ))}
    </ul>
  );
};
