import { useEffect, useState } from "react";

const mediumWidth = 768;

export const Hamburger = () => {
  const [isChecked, setIsChecked] = useState(false);

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

  /** FullNavを開いてからmd以上にしたときにFullNavを閉じるため。 */
  const handleResize = () => {
    // setIsMedium(window.innerWidth > mediumWidth);
    if (window.innerWidth > mediumWidth) {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-center animate-appearance">
      <input
        type="checkbox"
        id="hamburger"
        checked={isChecked}
        onChange={() => setIsChecked((pre) => !pre)}
        // className="hidden"
        className="sr-only peer"
      />
      <label
        htmlFor="hamburger"
        className="relative flex items-center justify-center w-8 h-6 overflow-hidden cursor-pointer peer-focus-visible:ring-2 ring-blue-400"
      >
        <span className="absolute bg-base-black h-0.5 w-6 rounded-full shadow-md transition-transform duration-300 group-[:has(#hamburger:checked)]/header:rotate-45 group-[:has(#hamburger:checked)]/header:translate-y-0 group-[:has(#hamburger:not(:checked))]/header:rotate-0 group-[:has(#hamburger:not(:checked))]/header:-translate-y-2" />
        <span className="absolute bg-base-black h-0.5 w-6 rounded-full shadow-md transition duration-300 group-[:has(#hamburger:checked)]/header:opacity-0 group-[:has(#hamburger:checked)]/header:-translate-x-full group-[:has(#hamburger:not(:checked))]/header:opacity-100 group-[:has(#hamburger:not(:checked))]/header:translate-x-0" />
        <span className="absolute bg-base-black h-0.5 w-6 rounded-full shadow-md transition-transform duration-300 group-[:has(#hamburger:checked)]/header:-rotate-45 group-[:has(#hamburger:checked)]/header:translate-y-0 group-[:has(#hamburger:not(:checked))]/header:rotate-0 group-[:has(#hamburger:not(:checked))]/header:translate-y-2" />
      </label>
    </div>
  );
};
