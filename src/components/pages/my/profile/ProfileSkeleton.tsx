export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col animate-appearance animate-loadingPulse max-w-3xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 h-16 bg-base-white flex flex-col justify-end">
        <div className="px-4 space-y-2">
          <h2 className="h-7 w-36 rounded-full bg-isabelline/75" />

          {/* Divider */}
          <div className="rounded-full mx-auto w-full h-0.5 bg-isabelline/75" />
        </div>
      </div>

      {/* Main */}
      <div className="mt-14 flex flex-col space-y-6">
        <div className="px-6 py-4 space-y-12">
          <div className="flex flex-col space-y-12">
            {/* Avatar */}
            <div className="space-y-2">
              <div className="ml-1 h-4 w-18 rounded-full bg-isabelline/75" />
              <div className="h-[136px] rounded-md bg-isabelline/75" />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <div className="ml-1 h-4 w-22 rounded-full bg-isabelline/75" />
              <div className="h-10 rounded-md bg-isabelline/75" />
              <div className="h-3" />
            </div>

            {/* Public URL */}
            <div className="space-y-2">
              <div className="ml-1 h-4 w-16 rounded-full bg-isabelline/75" />
              <div className="h-10 rounded-md bg-isabelline/75" />
              <div className="h-[30px]" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="ml-1 h-4 w-40 rounded-full bg-isabelline/75" />
              <div className="h-40 rounded-md bg-isabelline/75" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
