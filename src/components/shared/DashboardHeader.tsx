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
      <div className="w-full max-w-3xl mx-auto h-full px-6 flex justify-between items-center">
        <h2 className="mt-4 text-lg font-bold w-fit flex items-center">
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
