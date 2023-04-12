import clsx from "clsx";
import { useEffect, useState } from "react";
import { FC, useMemo } from "react";

type Props = {
  classWrapper?: string | undefined;
  className?: string | undefined;
  width?: string;
  height?: string;
  bgColor?: string;
};

export const Divider: FC<Props> = ({
  classWrapper,
  className,
  width,
  height,
  bgColor,
}) => {
  // const [iClassName, setIClassName] = useState<string>();

  // useEffect(() => {
  //   if (!className) return undefined;

  //   const classNameArray = className.split(" ").map((cls) => "!" + cls);
  //   const newClassName = classNameArray.join(" ");

  //   setIClassName(newClassName);
  // }, [className]);

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

        // className={`rounded-full bg-secondary w-full h-px ${iClassName}`}
        // className={clsx("rounded-full bg-secondary w-full h-px", iClassName)}
      />
    </div>
  );
};
