import { Flex } from "#/components/uiParts";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex className="h-screen bg-gradient-to-bl bg-white text-cocoa-800">
      {/* 左 */}
      <Sidebar />

      {/* 右 */}
      <div className="flex-1 my-4 mr-4 overflow-x-hidden bg-cocoa-50 border border-stone-300 overflow-y-scroll rounded-2xl custom-scrollbar">
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
