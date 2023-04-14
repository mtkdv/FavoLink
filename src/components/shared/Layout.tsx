import { Flex } from "#/components/uiParts";

import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex className="h-screen bg-stone-150 bg-gradient-to-bl text-liver-500">
      {/* 左 */}
      <Sidebar />

      {/* 右 */}
      <div className="custom-scrollbar my-4 mr-4 flex-1 overflow-x-hidden overflow-y-scroll rounded-2xl border border-stone-300 bg-white">
        <div
          id="scroll-element"
          className="relative min-h-dashboard-page border-r border-stone-300"
        >
          {children}
        </div>
      </div>
    </Flex>
  );
};
