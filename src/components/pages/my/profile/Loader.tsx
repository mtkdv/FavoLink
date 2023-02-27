import React from "react";
import ContentLoader from "react-content-loader";

export const Loader = (props: any) => (
  <ContentLoader
    speed={2}
    // width={494.73}
    width="100%"
    height={937.51}
    viewBox="0 0 494.73 937.51"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* <rect x="23" y="64" rx="6" ry="6" width="90%" height="136" /> */}
    <rect x="23" y="64" rx="6" ry="6" width="90%" height="14.5%" />
    {/* <rect x="23" y="272" rx="6" ry="6" width="90%" height="40" /> */}
    <rect x="23" y="272" rx="6" ry="6" width="90%" height="4.2%" />
    <rect x="23" y="404" rx="6" ry="6" width="446" height="40" />
    <rect x="23" y="554" rx="6" ry="6" width="446" height="160" />
  </ContentLoader>
);
