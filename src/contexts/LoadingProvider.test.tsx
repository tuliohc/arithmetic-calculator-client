import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoadingProvider, LoadingContext, LoadingContextType } from './LoadingProvider';

const TestComponent: React.FC = () => {
  const loadingContext = React.useContext(LoadingContext) as LoadingContextType;

  return (
    <>
      <div data-testid="loading-status">
        {loadingContext.isLoading ? 'Loading...' : 'Not loading'}
      </div>
      <button data-testid="start-loading" onClick={loadingContext.startLoading}>
        Start loading
      </button>
      <button data-testid="stop-loading" onClick={loadingContext.stopLoading}>
        Stop loading
      </button>
    </>
  );
};

describe('LoadingProvider', () => {
  it('should provide the context values when used', () => {
    const { getByTestId } = render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(getByTestId('loading-status').textContent).toBe('Not loading');
  });

  it('should update loading state when startLoading and stopLoading are called', async () => {
    const { getByTestId } = render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(getByTestId('loading-status').textContent).toBe('Not loading');

    fireEvent.click(getByTestId('start-loading'));

    await waitFor(() => {
      expect(getByTestId('loading-status').textContent).toBe('Loading...');
    });

    fireEvent.click(getByTestId('stop-loading'));

    await waitFor(() => {
      expect(getByTestId('loading-status').textContent).toBe('Not loading');
    });
  });
});
