import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { performOperation, OperationParams, OperationResponse } from '../../api/operations'
import CalculatorDisplay from './Display/CalculatorDisplay';
import ButtonGrid from './Buttons/ButtonGrid';
import { useBalance } from '../../contexts/BalanceContext';
import { Typography, useTheme } from '@mui/material';

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

  const handleOperation = async (operation: string) => {
    console.log('Performing operation:', operation);
    // Add logic to handle each arithmetic operation here

    switch (operation) {
      case 'delete':
        // Handle delete operation
        setDisplayValue('0');
        setOperationDisplay('');
        break;
      case 'addition':
        // Handle addition operation
        setOperationDisplay(displayValue + ' +');
        setDisplayValue('');
        break;
      case 'subtraction':
        // Handle subtraction operation
        setOperationDisplay(displayValue + ' -');
        setDisplayValue('');
        break;
      case 'multiplication':
        // Handle multiplication operation
        setOperationDisplay(displayValue + ' ×');
        setDisplayValue('');
        break;
      case 'division':
        // Handle division operation
        setOperationDisplay(displayValue + ' ÷');
        setDisplayValue('');
        break;
      case 'square_root':
        // Handle square root operation
        setOperationDisplay('√' + displayValue);
        console.log('squareeee')
        const secondOperand = displayValue !== '' ? parseFloat(displayValue) : undefined;
        const operationData: OperationParams = {
          operation: 'square_root',
          params: JSON.stringify([secondOperand]),
        };
        console.log(operationData)
        try {
          const operationResponse: OperationResponse = await performOperation(operationData)
          fetchAndUpdateBalance();
          setDisplayValue(operationResponse.result);
          setOperationDisplay('');
        } catch (error) {
          setDisplayValue('Error');
          console.error(error);
        }
        break;

      case 'equals':
        // Handle equals operation
        if (operationDisplay) {
          const operationParts = operationDisplay.split(' ');
          const firstOperand = parseFloat(operationParts[0]);
          const secondOperand = displayValue !== '' ? parseFloat(displayValue) : undefined;
          const operationSymbol = operationParts[1];

          let operationName = '';
          switch (operationSymbol) {
            case '+':
              operationName = 'addition';
              break;
            case '-':
              operationName = 'subtraction';
              break;
            case '×':
              operationName = 'multiplication';
              break;
            case '÷':
              operationName = 'division';
              break;
            case '√':
              operationName = 'square_root';
              break;
            default:
              break;
          }

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
        }
        break;
      default:
        break;
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
