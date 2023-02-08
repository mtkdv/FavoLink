import React from "react";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen overflow-y-hidden bg-primary text-[color:#1D1D1D]">
      <div className="max-w-3xl mx-auto flex">
        {/* L: Sidebar */}
        <Sidebar />

        {/* R: Page Contents */}
        <div className="relative flex-1 my-4 mr-4 overflow-x-hidden overflow-y-hidden">
          {/* スクロールバー表示時のコンテンツとの境界線 */}
          {/* <div className="absolute right-[14px] w-px h-full bg-secondary/70"></div> */}

          <div
            id="scroll-element"
            className="h-[calc(100vh_-_32px)] bg-white border-2 border-secondary px-4 py-8 overflow-y-scroll"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
