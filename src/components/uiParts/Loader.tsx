import clsx from "clsx";
import { PacmanLoader, RingLoader } from "react-spinners";

export const Loader = ({
  className,
  color,
  size,
}: {
  className?: string;
  color?: string;
  size?: number;
}) => {
  return (
    <div
      className={clsx(
        "flex h-full w-full items-center justify-center",
        className
      )}
    >
      {/* <PacmanLoader color={color} /> */}
      <RingLoader color={color ?? "teal"} size={size ?? 120} />
    </div>
  );
};
