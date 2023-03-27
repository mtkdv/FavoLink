import clsx from "clsx";

const bgImages = {
  profile: "bg-img-profile",
  addVideo: "bg-img-add-video",
} as const;

export const DashboardBackground = ({
  bgImage,
  children,
}: {
  bgImage: keyof typeof bgImages;
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* -mx-6 は DashboardMain の mx-6 を打ち消すため。 */}
      <div className="-mx-6 sticky top-16 h-dashboard-page-main overflow-hidden">
        <div
          className={clsx(
            "h-full bg-no-repeat bg-center-90 bg-contain w-3xl py-5 bg-origin-content bg-white/80 bg-blend-lighten",
            bgImages[bgImage]
          )}
        />
      </div>
      <div className="-mt-dashboard-page-main relative z-10">{children}</div>
    </>
  );
};
