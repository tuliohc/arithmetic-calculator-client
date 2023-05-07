import React, { useState } from 'react';
import { Alert, AlertColor, Backdrop, Box, CircularProgress, Snackbar, Typography, useTheme } from '@mui/material';
import { performOperation, OperationParams, OperationResponse } from '../../api/operations';
import CalculatorDisplay from './Display/CalculatorDisplay';
import ButtonGrid from './Buttons/ButtonGrid';
import { useBalance } from '../../contexts/BalanceContext';
import { getOperationName } from './_helpers/operations';
import useLoading from '../../hooks/useLoading';

const Calculator: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { fetchAndUpdateBalance } = useBalance();
  const [displayValue, setDisplayValue] = useState('0');
  const [operationDisplay, setOperationDisplay] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')

  const handleClick = (value: string) => {
    setDisplayValue((prevState) => {
      if (prevState === '0' || prevState === 'Error') {
        return value;
      } else {
        return prevState + value;
      }
    });
  };

  // Resets the calculator display and operation
  const handleDelete = () => {
    setDisplayValue('0');
    setOperationDisplay('');
  };

  // Resets the calculator display and operation
  const handleBinaryOperation = (symbol: string) => {
    setOperationDisplay(displayValue + ' ' + symbol);
    setDisplayValue('');
  };

  // Executes a unary operation and updates the display
  const handleUnaryOperation = async (operationName: string) => {
    const operand = parseFloat(displayValue);
    const operationData: OperationParams = {
      operation: operationName,
      params: JSON.stringify([operand]),
    };

    try {
      startLoading();
      const operationResponse: OperationResponse = await performOperation(operationData);
      fetchAndUpdateBalance();
      setDisplayValue(operationResponse.result);
      handleOperationWithSuccess(operationResponse)
    } catch (error) {
      console.error(error);
      setDisplayValue('0');
      handleOperationWithError(error as string)
    } finally {
      stopLoading();
    }
  };

  // Toggle between positive and negative number for the displayValue
  const handlePlusMinus = () => {
    setDisplayValue((prevState) => {
      if (prevState.startsWith('-')) {
        return prevState.slice(1);
      } else {
        return '-' + prevState;
      }
    });
  };


  // Handles various calculator operations based on user input
  const handleOperation = async (operation: string) => {
    switch (operation) {
      case 'plus_minus':
        handlePlusMinus();
        break;
      case 'delete':
        handleDelete();
        break;
      case 'addition':
        handleBinaryOperation('+');
        break;
      case 'subtraction':
        handleBinaryOperation('-');
        break;
      case 'multiplication':
        handleBinaryOperation('×');
        break;
      case 'division':
        handleBinaryOperation('÷');
        break;
      case 'square_root':
        setOperationDisplay('√' + displayValue);
        handleUnaryOperation('square_root');
        break;
      case 'random_string':
        setOperationDisplay('Random String');
        handleUnaryOperation('random_string');
        break;
      case 'equals':
        handleEquals(operationDisplay, displayValue);
        break;
      default:
        break;
    }
  };

  // Executes the current binary operation and updates the display
  const handleEquals = async (operationDisplay: string, displayValue: string) => {
    const operationParts = operationDisplay.split(' ');
    const firstOperand = parseFloat(operationParts[0]);
    const secondOperand = displayValue !== '' ? parseFloat(displayValue) : undefined;
    const operationSymbol = operationParts[1];

    const operationName = getOperationName(operationSymbol);

    if (operationName) {
      const operationData: OperationParams = {
        operation: operationName,
        params: secondOperand !== undefined ? JSON.stringify([firstOperand, secondOperand]) : JSON.stringify([firstOperand]),
      };

      try {
        startLoading();
        const operationResponse: OperationResponse = await performOperation(operationData);
        fetchAndUpdateBalance();
        setDisplayValue(operationResponse.result);
        setOperationDisplay('');
        handleOperationWithSuccess(operationResponse)
      } catch (error) {
        console.error(error);
        setDisplayValue('0');
        handleOperationWithError(error as string)
      } finally {
        stopLoading();
      }
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  const handleOperationWithSuccess = (operationResponse: OperationResponse) => {
    const formatedCost = `$${parseFloat(operationResponse.cost).toFixed(2)}`;
    setAlertSeverity('success')
    setSnackbarMessage(`Your operation had a cost of ${formatedCost}`)
    setShowSnackbar(true);
  }

  const handleOperationWithError = (error: string) => {
    setAlertSeverity('error')
    setSnackbarMessage(error)
    setShowSnackbar(true);
  }

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <>
      <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box display="flex" justifyContent="center" pt={1} sx={{ color: primaryColor }}>
        <Typography variant="h4" mb={4}>
          CALCULATOR
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" pt={1}>
        <Box
          sx={{
            display: 'flex',
            maxWidth: '270px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CalculatorDisplay displayValue={operationDisplay} />
          <CalculatorDisplay displayValue={displayValue} />
          <ButtonGrid handleClick={handleClick} handleOperation={handleOperation} />
        </Box>
      </Box>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: 8 }}
        >
          <Alert onClose={handleCloseSnackbar} severity={alertSeverity} variant="filled">
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </>
  );
};

export default Calculator;
