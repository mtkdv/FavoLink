export const AddVideoSkeleton = () => {
  return (
    <div className="flex flex-col animate-appearance animate-loadingPulse">
      {/* Header */}
      <div className="sticky top-0 z-20 h-16 bg-base-white flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <div className="relative">
            <div className="absolute right-2 bottom-0 flex justify-end space-x-4">
              {/* Add Collection Button */}
              <div className="flex justify-center">
                <div className="h-9 w-32 rounded-sm bg-isabelline/75" />
              </div>

              {/* Save Button */}
              <div className="h-9 w-28 rounded-md bg-isabelline/75" />
            </div>

            <h2 className="h-7 w-32 rounded-full bg-isabelline/75" />
          </div>

          {/* Divider */}
          <div className="rounded-full mx-auto w-full h-0.5 bg-isabelline/75" />
        </div>
      </div>

      {/* Main */}
      <ul className="px-6 pt-12 pb-6 space-y-6">
        <CategoryListItemSkeleton>
          <LinkListItemSkeleton />
          <LinkListItemSkeleton />
        </CategoryListItemSkeleton>

        <CategoryListItemSkeleton>
          <LinkListItemSkeleton />
          <LinkListItemSkeleton />
          <LinkListItemSkeleton />
        </CategoryListItemSkeleton>
      </ul>
    </div>
  );
};

const CategoryListItemSkeleton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <li className="px-3 py-6 rounded-md border-2 border-isabelline/75 flex flex-col">
      {/* Collection Inputs */}
      <div className="space-y-2">
        {/* Collection Label */}
        <div className="ml-1 h-4 w-24 rounded-full bg-isabelline/75" />

        {/* Collection Input, Placeholder, Counter */}
        <div className="h-10 w-full rounded-sm bg-isabelline/75" />
      </div>

      <ul className="mt-6 space-y-4">{children}</ul>
    </li>
  );
};

const LinkListItemSkeleton = () => {
  return (
    <li className="relative h-24 flex items-center rounded-sm border-2 border-isabelline/75">
      <div className="w-full px-1 flex space-x-2">
        {/* Left */}
        <div className="shrink-0 w-40 h-[90px] bg-isabelline/75" />
      </div>
    </li>
  );
};
