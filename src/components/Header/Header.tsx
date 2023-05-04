import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalculateIcon from '@mui/icons-material/Calculate';
import { signOut } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  balance: number;
}

const Header: React.FC<HeaderProps> = ({ balance }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to the sign-in page
      navigate('/sign-in');
    } catch (error) {
      console.error('Sign-out failed:', error);
      // TODO: Handle any errors that may occur during sign-out
      // TOAST
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ marginRight: 1 }}>
          <CalculateIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Arithmetic Calculator
        </Typography>
        <Box sx={{ flexGrow: 50, display: 'flex', justifyContent: 'center' }}>
          <Button color="inherit" variant="outlined" sx={{ marginX: 1 }}>
            CALCULATOR
          </Button>
          <Button color="inherit" variant="outlined" sx={{ marginX: 1 }}>
            RECORDS
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          <AccountBalanceWalletIcon />
          <Typography variant="h6" marginRight={5} marginLeft={1}>
            {balance.toFixed(2)}
          </Typography>
        </Box>
        <Button color="inherit" variant="outlined" onClick={handleSignOut}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;