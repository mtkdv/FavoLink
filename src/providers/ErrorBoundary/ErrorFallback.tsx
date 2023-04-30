import type { FallbackProps } from "react-error-boundary";

import UndrawNotFound from "/public/undraw_page_not_found_re_e9o6.svg";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="flex h-screen animate-appearance flex-col items-center pt-[10%]"
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
