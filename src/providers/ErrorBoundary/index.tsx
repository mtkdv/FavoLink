import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "#/providers/ErrorBoundary/ErrorFallback";
import { handleError } from "#/utils/handleError";

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={reset}
          onError={handleError}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
