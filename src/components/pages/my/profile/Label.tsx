export const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs text-cocoa-800 font-semibold tracking-wide"
    >
      {children}
    </label>
  );
};
