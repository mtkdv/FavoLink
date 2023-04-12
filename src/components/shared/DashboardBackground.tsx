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
      <div className="sticky top-16 -mx-6 h-dashboard-page-main overflow-hidden">
        <div
          className={clsx(
            "h-full w-3xl bg-white/80 bg-contain bg-center-90 bg-no-repeat bg-origin-content py-5 bg-blend-lighten",
            bgImages[bgImage]
          )}
        />
      </div>
      <div className="relative z-10 -mt-dashboard-page-main">{children}</div>
    </>
  );
};
