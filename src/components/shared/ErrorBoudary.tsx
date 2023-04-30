import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  // onReset: () => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("error:", error);
    console.error("Uncaught error:", errorInfo);
  }

  public render() {
    // console.log(this.props.onReset);
    if (this.state.hasError) {
      return (
        // <NextError statusCode={404} title="hogege" />
        <div className="flex h-screen w-full items-center justify-center">
          <h1>Error: Failed to fetch data.</h1>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              // this.props.onReset();
            }}
            className="rounded border-2 px-3 py-2"
          >
            retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
