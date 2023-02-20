export const ProfileLoader = () => {
  return (
    <div className="my-6 flex flex-col space-y-6 animate-pulse">
      <div className="px-6 py-4 space-y-12">
        <div className="flex flex-col space-y-12">
          {/* Avatar */}
          <div className="space-y-2">
            <div className="ml-1 h-4 w-18 rounded-full bg-isabelline" />
            <div className="h-[136px] rounded-md bg-isabelline" />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <div className="ml-1 h-4 w-22 rounded-full bg-isabelline" />
            <div className="h-10 rounded-md bg-isabelline" />
            <div className="h-3" />
          </div>

          {/* Public URL */}
          <div className="space-y-2">
            <div className="ml-1 h-4 w-16 rounded-full bg-isabelline" />
            <div className="h-10 rounded-md bg-isabelline" />
            <div className="h-[30px]" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="ml-1 h-4 w-40 rounded-full bg-isabelline" />
            <div className="h-40 rounded-md bg-isabelline" />
          </div>
        </div>
      </div>
    </div>
  );
};
