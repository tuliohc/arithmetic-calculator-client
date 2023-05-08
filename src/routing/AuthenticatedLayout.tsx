import React  from 'react';
import { Box, Container, Paper } from '@mui/material';
import Header from '../components/_layout/Header/Header';
import { BalanceProvider } from '../contexts/BalanceProvider';

interface AuthenticatedAppProps {
  children: React.ReactNode;
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ children }) => {
  return (
    <BalanceProvider>
      <Header />
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Container maxWidth="lg">
          <Paper elevation={2} sx={{ padding: 4, borderRadius: 1 }}>
            {children}
          </Paper>
        </Container>
      </Box>
    </BalanceProvider>
  );
};

export default AuthenticatedApp;