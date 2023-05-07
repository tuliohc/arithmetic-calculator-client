import { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks";
import useLoading from "../hooks/useLoading";
import { LoadingContext, LoadingContextType } from "../contexts/LoadingProvider";

// Create a custom LoadingProvider for testing
const TestLoadingProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: LoadingContextType;
}) => {
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

describe("useLoading hook", () => {
  it("should return the context value when used within a LoadingProvider", () => {
    const testValue: LoadingContextType = {
      isLoading: false,
      startLoading: () => {},
      stopLoading: () => {},
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <TestLoadingProvider value={testValue}>{children}</TestLoadingProvider>
    );

    const { result } = renderHook(() => useLoading(), { wrapper });

    expect(result.current).toBe(testValue);
  });

  it("should throw an error when used outside a LoadingProvider", () => {
    const { result } = renderHook(() => useLoading());

    expect(result.error).toEqual(
      Error("useLoading must be used within a LoadingProvider.")
    );
  });
});
