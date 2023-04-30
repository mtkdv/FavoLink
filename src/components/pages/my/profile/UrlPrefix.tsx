import { origin } from "#/const";

export const UrlPrefix = () => {
  return (
    <div className="grid w-72 place-items-center rounded-l-md border border-r-0 border-stone-300 bg-stone-100/90">
      <p className="font-light tracking-wider text-stone-800">{origin.user}</p>
    </div>
  );
};
