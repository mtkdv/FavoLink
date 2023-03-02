import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "#/components/shared/ErrorFallback";
import { handleError } from "#/utils/handleError";

export const ErrorBoundaries = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={reset}
          onError={handleError}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
