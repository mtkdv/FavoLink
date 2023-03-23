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
];

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
        <h3 className="text-sm font-semibold tracking-wide w-fit">
          {HEADER_TEXT}
        </h3>
      </header>

      <main className="mt-2">
        <ul className="flex flex-col max-xs:space-y-5 xs:flex-row xs:space-x-5">
          {modes.map((mode) => (
            <li key={mode.type} className="h-20 xs:flex-1 bg-white">
              <label
                htmlFor={`${modeId}-${mode.type}`}
                className="relative rounded-md cursor-pointer"
              >
                <input
                  type="radio"
                  name="mode"
                  id={`${modeId}-${mode.type}`}
                  defaultChecked={custom?.mode === mode.type}
                  onChange={handleChangeMode}
                  value={mode.type}
                  className="peer absolute top-3 right-4 outline-none appearance-none w-4 h-4 rounded-full border border-stone-300 checked:border-[5px] checked:border-cocoa-400 transition-all duration-100 cursor-pointer"
                />
                <div
                  className={clsx(
                    "h-full rounded-md ring-1 ring-stone-300 peer-[:is(:hover,:focus-visible)]:shadow-md transition peer-checked:ring-2 peer-checked:ring-cocoa-300 peer-checked:bg-cocoa-100 peer-checked:text-cocoa-700 flex flex-col space-y-2 justify-center pl-5"
                  )}
                >
                  <p className="font-semibold">{mode.title}</p>
                  <p className="text-xs break-all line-clamp-1">{mode.text}</p>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
