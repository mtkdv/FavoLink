export const AddVideoSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-3xl animate-appearance animate-loadingPulse flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 flex h-16 flex-col justify-end bg-base-white">
        <div className="space-y-2 px-4">
          <div className="relative">
            <div className="absolute bottom-0 right-2 flex justify-end space-x-4">
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
          <div className="mx-auto h-0.5 w-full rounded-full bg-isabelline/75" />
        </div>
      </div>

      {/* Main */}
      <ul className="space-y-6 px-6 pb-6 pt-14">
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
    <li className="flex flex-col rounded-md border-2 border-isabelline/75 px-3 py-6">
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
    <li className="relative flex h-24 items-center rounded-sm border-2 border-isabelline/75">
      <div className="flex w-full space-x-2 px-1">
        {/* Left */}
        <div className="h-[90px] w-40 shrink-0 bg-isabelline/75" />
      </div>
    </li>
  );
};
