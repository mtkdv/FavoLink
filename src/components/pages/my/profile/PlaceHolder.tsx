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
        "absolute left-3.5 text-stone-500 font-light tracking-wider transition duration-300 pointer-events-none peer-[:not(:placeholder-shown)]:-scale-x-100 peer-[:not(:placeholder-shown)]:opacity-0",
        className
      )}
    >
      {children}
    </p>
  );
};
