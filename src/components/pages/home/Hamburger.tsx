export const Hamburger = () => {
  return (
    <div className="ml-auto md:hidden grid place-items-center animate-appearance">
      <input type="checkbox" id="hamburger" className="hidden" />
      <label
        htmlFor="hamburger"
        className="relative flex items-center justify-center w-8 h-6 overflow-hidden cursor-pointer"
      >
        <span className="absolute bg-black h-0.5 w-6 rounded-full shadow-md transition-transform duration-300 group-[:has(#hamburger:checked)]/header:rotate-45 group-[:has(#hamburger:checked)]/header:translate-y-0 group-[:has(#hamburger:not(:checked))]/header:rotate-0 group-[:has(#hamburger:not(:checked))]/header:-translate-y-2"></span>
        <span className="absolute bg-black h-0.5 w-6 rounded-full shadow-md transition duration-300 group-[:has(#hamburger:checked)]/header:opacity-0 group-[:has(#hamburger:checked)]/header:-translate-x-full group-[:has(#hamburger:not(:checked))]/header:opacity-100 group-[:has(#hamburger:not(:checked))]/header:translate-x-0"></span>
        <span className="absolute bg-black h-0.5 w-6 rounded-full shadow-md transition-transform duration-300 group-[:has(#hamburger:checked)]/header:-rotate-45 group-[:has(#hamburger:checked)]/header:translate-y-0 group-[:has(#hamburger:not(:checked))]/header:rotate-0 group-[:has(#hamburger:not(:checked))]/header:translate-y-2"></span>
      </label>
    </div>
  );
};
