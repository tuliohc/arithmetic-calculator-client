import React from 'react';
import { render, fireEvent, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import { useBalance, BalanceProvider } from './BalanceProvider';
import { getBalance, BalanceResponse } from '../api/user';

// Mock the getBalance function from the user API
jest.mock('../api/user');
const mockedGetBalance = getBalance as jest.MockedFunction<typeof getBalance>;

const TestComponent: React.FC = () => {
  const { balance, fetchAndUpdateBalance } = useBalance();

  return (
    <div>
      <button data-testid="update-button" onClick={fetchAndUpdateBalance}>
        Update Balance
      </button>
      <div data-testid="balance-display">{balance}</div>
    </div>
  );
};

describe('BalanceContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide the context values when used within a BalanceProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BalanceProvider>{children}</BalanceProvider>
    );

    const { getByTestId } = render(<TestComponent />, { wrapper });

    expect(getByTestId('balance-display').textContent).toBe('');
  });

  it('should fetch and update balance when fetchAndUpdateBalance is called', async () => {
    const testBalance: BalanceResponse = { balance: '100' };
    mockedGetBalance.mockResolvedValue(testBalance);
  
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BalanceProvider>{children}</BalanceProvider>
    );
  
    const { getByTestId } = render(<TestComponent />, { wrapper });
  
    const updateButton = getByTestId('update-button');
    act(() => {
      fireEvent.click(updateButton);
    });
  
    // Wait for the balance to update
    await waitFor(() => expect(getByTestId('balance-display').textContent).toBe(testBalance.balance));
  
    // first render + after update the balance state
    await waitFor(() => expect(mockedGetBalance).toHaveBeenCalledTimes(2));
  });
  
  
  
});
