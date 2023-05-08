import React, { ReactNode, useEffect, useState } from "react";
import { render, act, waitFor } from "@testing-library/react";
import useLoading from "../hooks/useLoading";
import { LoadingContext, LoadingContextType, LoadingProvider } from "../contexts/LoadingProvider";

interface TestLoadingProviderProps {
  setValue: (value: LoadingContextType) => void;
  children: ReactNode;
}
// Create a custom LoadingProvider for testing
const TestLoadingProvider: React.FC<TestLoadingProviderProps> = ({
  setValue,
  children,
}) => {
  const [value, setValueState] = useState<LoadingContextType | null>(null);

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value, setValue]);

  return (
    <LoadingProvider>
      <LoadingContext.Consumer>
        {(context) => {
          if (context && !value) {
            setValueState(context);
          }
          return null;
        }}
      </LoadingContext.Consumer>
      {children}
    </LoadingProvider>
  );
};

const TestChild: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  return (
    <>
      <div data-testid="loading-status">{isLoading ? "Loading..." : "Not loading"}</div>
      <button onClick={startLoading}>Start loading</button>
      <button onClick={stopLoading}>Stop loading</button>
    </>
  );
};

describe("useLoading hook", () => {
  it("should return the context value when used within a LoadingProvider", () => {
    let testValue: LoadingContextType | {} = {};
  
    const setValue = (value: LoadingContextType) => {
      testValue = value;
    };
  
    const { getByText } = render(
      <TestLoadingProvider setValue={setValue}>
        <TestChild />
      </TestLoadingProvider>
    );
  
    expect(testValue).toBeDefined();
    expect((testValue as LoadingContextType).isLoading).toBe(false);
    expect(getByText("Not loading")).toBeInTheDocument();
  });
  
  

  it('should throw an error when used outside a LoadingProvider', () => {
    expect(() => render(<TestChild />)).toThrow(
      'useLoading must be used within a LoadingProvider.'
    );
  });

  it("should update loading state when startLoading and stopLoading are called", async () => {
    let testValue: LoadingContextType | null = null;
  
    const setValue = (value: LoadingContextType) => {
      testValue = value;
    };
  
    const { getByText, getByTestId } = render(
      <TestLoadingProvider setValue={setValue}>
        <TestChild />
      </TestLoadingProvider>
    );
  
    expect(getByTestId("loading-status").textContent).toBe("Not loading");
  
    // Simulate start loading
    act(() => {
      testValue?.startLoading();
    });
  
    // Wait for loading state to update
    await waitFor(() => {
      expect(getByTestId("loading-status").textContent).toBe("Loading...");
    });
  
    // Simulate stop loading
    act(() => {
      testValue?.stopLoading();
    });
  
    // Wait for loading state to update
    await waitFor(() => {
      expect(getByTestId("loading-status").textContent).toBe("Not loading");
    });
  });


});

