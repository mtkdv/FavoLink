import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";
import { ReactElement } from "react";

const Customize: NextPageWithLayout = () => {
  return (
    <>
      {/* <div className="w-2 h-[3000px] bg-gradient-to-b from-rose-400 to-blue-400"></div> */}
      <div className="grid grid-cols-3 h-48">
        <div className="bg-slate-200 grid place-items-center">slate</div>
        <div className="bg-gray-200 grid place-items-center">gray</div>
        <div className="bg-zinc-200 grid place-items-center">zinc</div>
        <div className="bg-neutral-200 grid place-items-center">neutral</div>
        <div className="bg-[#EEE9E7] grid place-items-center">main</div>
        <div className="bg-stone-200 grid place-items-center">stone</div>
        <div className="bg-rose-50 grid place-items-center">rose</div>
      </div>
    </>
  );
};

Customize.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Customize;
