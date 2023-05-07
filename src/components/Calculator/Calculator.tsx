import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { performOperation, OperationParams, OperationResponse } from '../../api/operations';
import CalculatorDisplay from './Display/CalculatorDisplay';
import ButtonGrid from './Buttons/ButtonGrid';
import { useBalance } from '../../contexts/BalanceContext';
import { Typography, useTheme } from '@mui/material';
import { getOperationName } from './_helpers/operations';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operationDisplay, setOperationDisplay] = useState('');
  const { fetchAndUpdateBalance } = useBalance();

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
      const operationResponse: OperationResponse = await performOperation(operationData);
      fetchAndUpdateBalance();
      setDisplayValue(operationResponse.result);
    } catch (error) {
      setDisplayValue('Error');
      console.error(error);
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
        const operationResponse: OperationResponse = await performOperation(operationData);
        fetchAndUpdateBalance();
        setDisplayValue(operationResponse.result);
        setOperationDisplay('');
      } catch (error) {
        setDisplayValue('Error');
        console.error(error);
      }
    }
  };

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <>
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
    </>
  );
};

export default Calculator;
