import clsx from "clsx";

export const PlaceHolder = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={clsx(
        "pointer-events-none absolute left-3.5 font-light tracking-wider text-stone-500 transition duration-300 peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0",
        className
      )}
    >
      {children}
    </p>
  );
};
