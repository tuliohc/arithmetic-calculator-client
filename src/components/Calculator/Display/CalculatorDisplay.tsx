import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { lightBlue } from '@mui/material/colors';

interface CalculatorDisplayProps {
  displayValue: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ displayValue }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '93%',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 10px',
        marginBottom: '3px',
        backgroundColor: lightBlue[50],
        border: `1px solid ${lightBlue[200]}`,
        ml: 0.4
      }}
    >
      <Typography variant="h5" textAlign="right" noWrap color={lightBlue[800]} data-testid="calculator-display">
        {displayValue}
      </Typography>
    </Paper>
  );
};

export default CalculatorDisplay;
