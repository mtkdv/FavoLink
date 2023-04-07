export const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold tracking-wide">
      {children}
    </label>
  );
};
