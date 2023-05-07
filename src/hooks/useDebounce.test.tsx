import { renderHook } from '@testing-library/react-hooks';
import useDebounce from '../hooks/useDebounce';

describe('useDebounce hook', () => {
  it('should update the debounced value after the specified delay', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: {
        value: 'initial',
        delay: 300,
      },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 300 });

    await waitForNextUpdate();

    expect(result.current).toBe('updated');
  });

  it('should cancel the debounce timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const { unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: {
        value: 'initial',
        delay: 300,
      },
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
