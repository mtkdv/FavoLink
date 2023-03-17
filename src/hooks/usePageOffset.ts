import { useEffect, useState } from "react";

const axes = {
  x: "pageXOffset",
  y: "pageYOffset",
} as const;

export const usePageOffset = (axis: keyof typeof axes, offset: number) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShow(window[axes[axis]] >= offset);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isShow;
};
