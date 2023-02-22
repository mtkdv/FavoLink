export const Skeleton = ({
  as = "div",
  children,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
}) => {
  const As = as;
  return (
    <As className="relative overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-skeleton" />

      {children}
    </As>
  );
};
