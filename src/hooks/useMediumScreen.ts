import { useEffect, useState } from "react";

const mediumWidth = 768;

export const useMediumScreen = () => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  const handleResize = () => {
    setIsMdScreen(window.innerWidth > mediumWidth);
  };

  // const handleResize = () => {
  //   if (window.innerWidth > mediumWidth === isMdScreen) {
  //     console.log("equal", window.innerWidth, isMdScreen);
  //     return;
  //   }
  //   console.log("not", window.innerWidth, isMdScreen);
  //   setIsMdScreen(window.innerWidth > mediumWidth);
  // };

  useEffect(() => {
    handleResize();
    // setIsMdScreen(window.innerWidth > mediumWidth);
    // console.log(
    //   "render",
    //   window.innerWidth > mediumWidth,
    //   window.innerWidth,
    //   isMdScreen
    // );

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMdScreen;
};
