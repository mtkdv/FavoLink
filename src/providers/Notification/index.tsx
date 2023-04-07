import { kleeOne } from "#/lib/nextFont";
import { Toaster } from "react-hot-toast";

export const Notification = () => {
  return (
    <Toaster
      // position="bottom-right"
      position="top-center"
      toastOptions={{
        style: {
          // backgroundColor: "#333",
          // color: "#fff",
        },
        // className: "bg-accent text-white ring-2 ring-offset-[3px] ring-accent",
        className: kleeOne.className,
        success: {
          iconTheme: {
            primary: "teal",
            secondary: "#fff",
          },
          duration: 5000,
        },
      }}
    />
  );
};
