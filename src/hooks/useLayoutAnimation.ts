import { useEffect, useRef } from "react";

export const useLayoutAnimation = (index: number) => {
  const position = useRef({ y: 0 }).current;

  const animation = (ele: HTMLLIElement, deltaY: number) => {
    const keyFrames = {
      transform: [`translateY(${deltaY}px)`, "translateY(0)"],
    };
    const keyframeAnimationOptions: KeyframeAnimationOptions = {
      duration: 500,
      easing: "ease-in-out",
    };
    ele.animate(keyFrames, keyframeAnimationOptions);
  };

  const liRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!liRef.current) return;
    const rect = liRef.current.getBoundingClientRect();
    if (position.y) {
      // console.log(position.y, position.y - rect.top);
      const deltaY = position.y - rect.top;
      animation(liRef.current, deltaY);
    }
    position.y = rect.top;
  }, [index]);

  return { liRef };
};
