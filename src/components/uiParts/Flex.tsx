import clsx from "clsx";

const justifies = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

export const Flex = ({
  children,
  className,
  justify,
  gap,
}: {
  children: React.ReactNode;
  className?: string;
  justify?: keyof typeof justifies;
  gap?: number;
}) => {
  return (
    <div
      className={clsx("flex", className, justify && justifies[justify])}
      style={{ gap: gap ?? 0 }}
    >
      {children}
    </div>
  );
};
