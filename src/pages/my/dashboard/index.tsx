import { ReactElement } from "react";
import { NextPageWithLayout } from "#/pages/_app";
import { Layout } from "#/components/shared/Layout";

const Dashboard: NextPageWithLayout = () => {
  return (
    <div>
      <p>dashboard</p>
    </div>
    // <div className="h-[800px] border border-red-300">
    //   <div className="min-h-[80px] border border-blue-300">
    //     <p className="h-96 border border-yellow-700">Hello</p>
    //   </div>
    // </div>

    // <div className="mx-auto mt-20 w-[50%] bg-black/10">
    //   <div className="h-20 w-[200px] bg-orange-300">w-[200px]</div>
    //   <div className="h-20 min-w-[200px] bg-blue-300">min-w-[200px]</div>
    //   <div className="h-20 max-w-[200px] bg-green-300">max-w-[200px]</div>
    // </div>

    // <div className="mx-auto h-[50%] w-fit flex bg-black/10">
    //   <div className="h-[200px] w-28 bg-orange-300">h-[200px]</div>
    //   <div className="min-h-[200px] w-28 bg-blue-300">min-h-[200px]</div>
    //   <div className="max-h-[200px] w-28 bg-green-300">max-h-[200px]</div>
    // </div>

    // <div className="w-80 h-10 flex bg-green-500">
    //   <div className="bg-red-400">あ</div>
    //   <div className="bg-purple-400">い</div>
    //   {/* <div className="h-10 bg-blue-400"></div> */}
    // </div>

    // <div className="mt-20 flex justify-center">
    //   <div className="flex flex-col">
    //     <div className="w-20 h-20 bg-newOrange-50 text-newOrange-800">
    //       newOrange
    //     </div>
    //     <div className="w-20 h-20 bg-newOrange-100" />
    //     <div className="w-20 h-20 bg-newOrange-200" />
    //     <div className="w-20 h-20 bg-newOrange-300" />
    //     <div className="w-20 h-20 bg-newOrange-400" />
    //     <div className="w-20 h-20 bg-newOrange-500" />
    //     <div className="w-20 h-20 bg-newOrange-600" />
    //     <div className="w-20 h-20 bg-newOrange-700" />
    //     <div className="w-20 h-20 bg-newOrange-800" />
    //     <div className="w-20 h-20 bg-newOrange-900" />
    //   </div>
    //   <div className="flex flex-col">
    //     <div className="w-20 h-20 bg-cocoa-50 text-cocoa-800">cocoa</div>
    //     <div className="w-20 h-20 bg-cocoa-100" />
    //     <div className="w-20 h-20 bg-cocoa-200" />
    //     <div className="w-20 h-20 bg-cocoa-300" />
    //     <div className="w-20 h-20 bg-cocoa-400" />
    //     <div className="w-20 h-20 bg-cocoa-500" />
    //     <div className="w-20 h-20 bg-cocoa-600" />
    //     <div className="w-20 h-20 bg-cocoa-700" />
    //     <div className="w-20 h-20 bg-cocoa-800" />
    //     <div className="w-20 h-20 bg-cocoa-900" />
    //   </div>
    //   <div className="flex flex-col">
    //     <div className="w-20 h-20 bg-orange-50 text-orange-800">orange</div>
    //     <div className="w-20 h-20 bg-orange-100" />
    //     <div className="w-20 h-20 bg-orange-200" />
    //     <div className="w-20 h-20 bg-orange-300" />
    //     <div className="w-20 h-20 bg-orange-400" />
    //     <div className="w-20 h-20 bg-orange-500" />
    //     <div className="w-20 h-20 bg-orange-600" />
    //     <div className="w-20 h-20 bg-orange-700" />
    //     <div className="w-20 h-20 bg-orange-800" />
    //     <div className="w-20 h-20 bg-orange-900" />
    //   </div>
    //   <div className="flex flex-col">
    //     <div className="w-20 h-20 bg-amber-50 text-amber-800">amber</div>
    //     <div className="w-20 h-20 bg-amber-100" />
    //     <div className="w-20 h-20 bg-amber-200" />
    //     <div className="w-20 h-20 bg-amber-300" />
    //     <div className="w-20 h-20 bg-amber-400" />
    //     <div className="w-20 h-20 bg-amber-500" />
    //     <div className="w-20 h-20 bg-amber-600" />
    //     <div className="w-20 h-20 bg-amber-700" />
    //     <div className="w-20 h-20 bg-amber-800" />
    //     <div className="w-20 h-20 bg-amber-900" />
    //   </div>
    //   <div className="flex flex-col">
    //     <div className="w-20 h-20 bg-yellow-50 text-yellow-800">yellow</div>
    //     <div className="w-20 h-20 bg-yellow-100" />
    //     <div className="w-20 h-20 bg-yellow-200" />
    //     <div className="w-20 h-20 bg-yellow-300" />
    //     <div className="w-20 h-20 bg-yellow-400" />
    //     <div className="w-20 h-20 bg-yellow-500" />
    //     <div className="w-20 h-20 bg-yellow-600" />
    //     <div className="w-20 h-20 bg-yellow-700" />
    //     <div className="w-20 h-20 bg-yellow-800" />
    //     <div className="w-20 h-20 bg-yellow-900" />
    //   </div>
    // </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
