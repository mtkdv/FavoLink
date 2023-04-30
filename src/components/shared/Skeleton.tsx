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
      <div className="absolute h-full w-full animate-skeleton bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {children}
    </As>
  );
};
