type HasSize = {
  size: number;
  axis: "row" | "column";
};

type Props = {} | HasSize;

const hasSize = (props: Props): props is HasSize => {
  return Object.hasOwn(props, "size");
};

// const hasAxis = (props: Props): props is HasSize => {
//   return Object.hasOwn(props, "size");
// };

export const Spacer = (props: Props) => {
  return hasSize(props) ? (
    props.axis === "row" ? (
      <div
        style={{
          height: "auto",
          width: `${props.size}px`,
        }}
      />
    ) : (
      <div
        style={{
          height: `${props.size}px`,
          width: "auto",
        }}
      />
    )
  ) : (
    <div className="flex-1 self-stretch" />
  );
};
