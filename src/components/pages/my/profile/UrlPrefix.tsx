import { urls } from "#/const";

export const UrlPrefix = () => {
  return (
    <div className="w-44 bg-stone-100/90 grid place-items-center border border-r-0 border-stone-300 rounded-l-md">
      <p className="text-stone-800 font-light tracking-wider">{urls.domain}</p>
    </div>
  );
};
