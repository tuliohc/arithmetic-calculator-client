import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useDebounce from '../hooks/useDebounce';

const TestComponent: React.FC<{ value: any; delay: number }> = ({ value, delay }) => {
  const debouncedValue = useDebounce(value, delay);

  return <div data-testid="debounced-value">{debouncedValue}</div>;
};

describe('useDebounce hook', () => {
  it('should update the debounced value after the specified delay', async () => {
    const { getByTestId, rerender } = render(<TestComponent value="initial" delay={300} />);

    const debouncedValueElement = getByTestId('debounced-value');
    expect(debouncedValueElement.textContent).toBe('initial');

    rerender(<TestComponent value="updated" delay={300} />);

    await waitFor(() => expect(debouncedValueElement.textContent).toBe('updated'), {
      timeout: 400, // Wait a bit longer than the debounce delay
    });
  });

  it('should cancel the debounce timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const { unmount } = render(<TestComponent value="initial" delay={300} />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
