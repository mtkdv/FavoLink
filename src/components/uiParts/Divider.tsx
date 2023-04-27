import clsx from "clsx";

export const Divider = ({
  classWrapper,
  className,
  width,
  height,
  bgColor,
}: {
  classWrapper?: string | undefined;
  className?: string | undefined;
  width?: string;
  height?: string;
  bgColor?: string;
}) => {
  return (
    <div className={classWrapper}>
      <div
        className={clsx(
          "mx-auto rounded-full",
          width ?? "w-full",
          height ?? "h-px",
          bgColor ?? "bg-stone-300",
          className
        )}
      />
    </div>
  );
};
