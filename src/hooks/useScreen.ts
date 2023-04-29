import { useEffect, useState } from "react";

const screens = {
  xs: 560,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const useScreen = (screen: keyof typeof screens) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScreen, setIsScreen] = useState(false);

  const handleResize = () => {
    setIsScreen(window.innerWidth > screens[screen]);
  };

  // const handleResize = () => {
  //   if (window.innerWidth > width === isScreen) {
  //     console.log("equal", window.innerWidth, isScreen);
  //     return;
  //   }
  //   console.log("not", window.innerWidth, isScreen);
  //   setIsScreen(window.innerWidth > width);
  // };

  useEffect(() => {
    handleResize();
    // setIsScreen(window.innerWidth > width);
    // console.log(
    //   "render",
    //   window.innerWidth > width,
    //   window.innerWidth,
    //   isScreen
    // );

    setIsLoading(false);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isScreen, isLoading };
};
