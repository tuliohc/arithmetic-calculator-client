import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBalance, BalanceResponse } from '../api/user';

interface BalanceContextValue {
  balance: string | null;
  fetchAndUpdateBalance: () => void;
}

const BalanceContext = createContext<BalanceContextValue>({
  balance: null,
  fetchAndUpdateBalance: () => {},
});

export const useBalance = () => useContext(BalanceContext);

interface BalanceProviderProps {
  children: React.ReactNode;
}

export const BalanceProvider: React.FC<BalanceProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState<string | null>(null);

  const fetchAndUpdateBalance = async () => {
    try {
      const balanceData: BalanceResponse = await getBalance();
      setBalance(balanceData.balance);
    } catch (error) {
      console.error('Error while fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchAndUpdateBalance(); // Fetch balance on mount
    const interval = setInterval(fetchAndUpdateBalance, 30000); // Update balance every 30 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, fetchAndUpdateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
