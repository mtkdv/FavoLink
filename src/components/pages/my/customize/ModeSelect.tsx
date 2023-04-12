import { useId } from "react";
import { Mode } from "@prisma/client";
import clsx from "clsx";

import { useGetCustom } from "#/hooks";

const HEADER_TEXT = "モード選択";

const modes = [
  {
    type: "LIGHT",
    title: "ライトモード",
    text: "明るい背景画像に向いています。",
  },
  {
    type: "DARK",
    title: "ダークモード",
    text: "暗い背景画像に向いています。",
  },
] as const;

export const ModeSelect = ({
  setMode,
}: {
  setMode: React.Dispatch<React.SetStateAction<Mode | undefined>>;
}) => {
  const { data: custom } = useGetCustom();
  const modeId = useId();

  const handleChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as Mode);
  };

  return (
    <div>
      <header className="ml-1">
        <h3 className="w-fit text-sm font-semibold tracking-wide">
          {HEADER_TEXT}
        </h3>
      </header>

      <main className="mt-2">
        <ul className="flex flex-col max-xs:space-y-5 xs:flex-row xs:space-x-5">
          {modes.map((mode) => (
            <li key={mode.type} className="h-20 bg-white xs:flex-1">
              <label
                htmlFor={`${modeId}-${mode.type}`}
                className="relative cursor-pointer rounded-md"
              >
                <input
                  type="radio"
                  name="mode"
                  id={`${modeId}-${mode.type}`}
                  defaultChecked={custom?.mode === mode.type}
                  onChange={handleChangeMode}
                  value={mode.type}
                  className="peer absolute right-4 top-3 h-4 w-4 cursor-pointer appearance-none rounded-full border border-stone-300 outline-none transition-all duration-100 checked:border-[5px] checked:border-teal-700"
                />
                <div
                  className={clsx(
                    "flex h-full flex-col justify-center space-y-2 rounded-md pl-5 ring-1 ring-stone-300 transition peer-checked:bg-teal-50 peer-checked:text-liver-500 peer-checked:ring-2 peer-checked:ring-teal-600 peer-[:is(:hover,:focus-visible)]:shadow-md"
                  )}
                >
                  <p className="font-semibold">{mode.title}</p>
                  <p className="break-all text-xs line-clamp-1">{mode.text}</p>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
