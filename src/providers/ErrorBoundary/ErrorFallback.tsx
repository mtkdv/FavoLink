import { isAxiosError } from "axios";
import { FallbackProps } from "react-error-boundary";
import UndrawNotFound from "/public/undraw_page_not_found_re_e9o6.svg";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  // console.log("isAxiosError(error) =>", isAxiosError(error));

  return (
    <div
      role="alert"
      className="h-screen flex flex-col items-center animate-appearance pt-[10%]"
    >
      <UndrawNotFound />
      {/* <p>Something went wrong:</p>
      <pre>{error.message}</pre> */}
      {/* TODO: button装飾 */}
      <button onClick={resetErrorBoundary} className="mt-10">
        Try again
      </button>
    </div>
  );
};
