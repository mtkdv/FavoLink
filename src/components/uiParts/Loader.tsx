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
        "w-full h-full flex justify-center items-center",
        className
      )}
    >
      {/* <PacmanLoader color={color} /> */}
      <RingLoader color={color ?? "teal"} size={size ?? 120} />
    </div>
  );
};
