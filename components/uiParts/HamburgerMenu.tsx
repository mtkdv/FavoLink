import clsx from "clsx";
import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const HamburgerMenu: FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="md:hidden grid place-items-center">
      <button
        type="button"
        onClick={() => {
          setIsMenuOpen((current) => !current);
        }}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <span className="relative flex items-center justify-center w-8 h-6 overflow-hidden">
          <span
            className={clsx(
              "absolute bg-black h-0.5 w-6 rounded-full shadow-md transition-transform duration-300",
              !isMenuOpen && "rotate-0 -translate-y-2",
              isMenuOpen && "rotate-45 translate-y-0"
            )}
          ></span>
          <span
            className={clsx(
              "absolute bg-black h-0.5 w-6 rounded-full shadow-md transition duration-300",
              !isMenuOpen && "opacity-100 translate-x-0",
              isMenuOpen && "opacity-0 -translate-x-full"
            )}
          ></span>
          <span
            className={clsx(
              "absolute bg-black h-0.5 w-6 rounded-full shadow-md transition-transform duration-300",
              !isMenuOpen && "rotate-0 translate-y-2",
              isMenuOpen && "-rotate-45 translate-y-0"
            )}
          ></span>
        </span>
      </button>
    </div>
  );
};
