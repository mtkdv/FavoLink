export const handleError = (error: Error, info: { componentStack: string }) => {
  console.error("error.message:", error.message);
  console.error("info.componentStack:", info.componentStack);
};
