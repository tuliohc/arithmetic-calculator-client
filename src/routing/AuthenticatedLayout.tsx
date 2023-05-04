import { Box, Container, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';

interface AuthenticatedAppProps {
  children: React.ReactNode;
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    // Set the balance for the user after checking authentication
    // Replace the following line with your actual API call to fetch user balance
    setBalance(100);
  }, []);

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