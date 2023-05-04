import { Box, Container, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { getBalance, BalanceResponse } from '../api/user';


interface AuthenticatedAppProps {
  children: React.ReactNode;
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ children }) => {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    fetchAndUpdateBalance(); // Fetch balance on mount
    const interval = setInterval(fetchAndUpdateBalance, 30000); // Update balance every 30 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const fetchAndUpdateBalance = async () => {
    try {
      const balanceData: BalanceResponse = await getBalance();
      setBalance(balanceData.balance);
    } catch (error) {
      console.error('Error while fetching balance:', error);
    }
  };

  return (
    <>
      <Header balance={balance} />
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Container maxWidth="lg">
          <Paper elevation={2} sx={{ padding: 4, borderRadius: 1 }}>
            {children}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AuthenticatedApp;