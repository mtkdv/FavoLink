import { Divider } from "#/components/uiParts";

export const DashboardHeader = ({
  pageTitle,
  children,
}: {
  pageTitle: string;
  children?: React.ReactNode;
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between px-6">
        <h2 className="mt-4 flex w-fit items-center text-lg font-bold">
          {pageTitle}
        </h2>

        {children}
      </div>
      <div className="absolute bottom-0 w-full px-2">
        <Divider />
      </div>
    </header>
  );
};
