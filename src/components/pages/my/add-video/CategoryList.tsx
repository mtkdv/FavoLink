import {
  Control,
  FieldArrayWithId,
  FieldErrorsImpl,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Schema } from "#/pages/my/add-video";
import { CategoryListItem } from "#/components/pages/my/add-video";

type Props = {
  control: Control<Schema>;
  register: UseFormRegister<Schema>;
  setValue: UseFormSetValue<Schema>;
  getValues: UseFormGetValues<Schema>;
  errors: Partial<FieldErrorsImpl<Schema>>;
  categoryFields: FieldArrayWithId<Schema, "youtube", "id">[];
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
};

export const CategoryList: React.FC<Props> = ({ categoryFields, ...rest }) => {
  return (
    <ul id="target-ul" className="space-y-8">
      {categoryFields.map((categoryField, index) => (
        <CategoryListItem
          key={categoryField.id}
          categoryFieldsLength={categoryFields.length}
          // {...{ categoryField, index }}
          // {...rest}
          {...{ categoryField, index, ...rest }}
        ></CategoryListItem>
      ))}
    </ul>
  );
};
