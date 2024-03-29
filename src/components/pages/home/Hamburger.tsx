import clsx from "clsx";
import { useEffect, useState } from "react";

import { Appearance } from "#/components/shared";

const MEDIUM_WIDTH = 768;

export const Hamburger = () => {
  const [isChecked, setIsChecked] = useState(false);

  /** FullNavを表示した際、html要素のスクロールを非表示にする。 */
  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add("overflow-hidden", "pr-3.5");
    } else {
      document.documentElement.classList.remove("overflow-hidden", "pr-3.5");
    }

    // FullNavから他ページへ遷移した際に、非表示にしたスクロールバーの表示を戻すため。
    return () => {
      document.documentElement.classList.remove("overflow-hidden", "pr-3.5");
    };
  }, [isChecked]);

  /** FullNav表示後にwidthをmd以上に拡大した場合に、FullNavを閉じる。 */
  useEffect(() => {
    const handleResize = () => {
      // setIsMedium(window.innerWidth > MEDIUM_WIDTH);
      if (window.innerWidth > MEDIUM_WIDTH) {
        setIsChecked(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Appearance>
      <input
        type="checkbox"
        id="hamburger"
        checked={isChecked}
        onChange={() => setIsChecked((pre) => !pre)}
        className="peer sr-only"
      />
      <label
        htmlFor="hamburger"
        className="relative flex h-6 w-8 cursor-pointer items-center justify-center overflow-hidden ring-juniper-500 transition peer-focus-visible:ring-2"
      >
        <Bar position="top" />
        <Bar position="middle" />
        <Bar position="bottom" />
      </label>
    </Appearance>
  );
};

const positions = {
  top: "group-[:has(#hamburger:checked)]/header:rotate-45 group-[:has(#hamburger:checked)]/header:translate-y-0 group-[:has(#hamburger:not(:checked))]/header:rotate-0 group-[:has(#hamburger:not(:checked))]/header:-translate-y-2",
  middle:
    "group-[:has(#hamburger:checked)]/header:opacity-0 group-[:has(#hamburger:checked)]/header:-translate-x-full group-[:has(#hamburger:not(:checked))]/header:opacity-100 group-[:has(#hamburger:not(:checked))]/header:translate-x-0",
  bottom:
    "group-[:has(#hamburger:checked)]/header:-rotate-45 group-[:has(#hamburger:checked)]/header:translate-y-0 group-[:has(#hamburger:not(:checked))]/header:rotate-0 group-[:has(#hamburger:not(:checked))]/header:translate-y-2",
};

const Bar = ({ position }: { position: keyof typeof positions }) => {
  return (
    <span
      className={clsx(
        "absolute h-0.5 w-6 rounded-full bg-liver-500 shadow-md transition duration-300",
        positions[position]
      )}
    />
  );
};
