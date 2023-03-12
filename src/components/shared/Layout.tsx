import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-gradient-to-bl from-cocoa-100 via-cocoa-100/50 to-cocoa-100 text-cocoa-800 flex">
      {/* 左 */}
      <Sidebar />

      {/* 右 */}
      <div className="flex-1 my-4 mr-4 overflow-x-hidden bg-base-white border border-stone-300">
        <div id="scroll-element" className="max-w-3xl mx-auto relative">
          {children}
        </div>
      </div>
    </div>
  );
};
