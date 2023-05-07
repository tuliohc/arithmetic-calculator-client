import React from 'react';
import Grid from '@mui/material/Grid';
import NumberButton from './NumberButton';
import OperationButton from './OperationButton';

interface ButtonGridProps {
  handleClick: (value: string) => void;
  handleOperation: (operation: string) => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ handleClick, handleOperation }) => {
  return (
    <Grid container spacing={1} marginTop={0}>
      {/* First row */}
      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="delete"
          onOperationClick={handleOperation}
        >
          AC
        </OperationButton>
      </Grid>
      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="random_string"
          onOperationClick={handleOperation}
        >
          RS
        </OperationButton>
      </Grid>
      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="square_root"
          onOperationClick={handleOperation}
        >
          √
        </OperationButton>
      </Grid>
      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="division"
          onOperationClick={handleOperation}
        >
          ÷
        </OperationButton>
      </Grid>

      {/* Second Row */}
      <Grid item xs={3}>
        <NumberButton
          value="7"
          onButtonClick={handleClick}
        >
          7
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="8"
          onButtonClick={handleClick}
        >
          8
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="9"
          onButtonClick={handleClick}
        >
          9
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="multiplication"
          onOperationClick={handleOperation}
        >
          ×
        </OperationButton>
      </Grid>

      {/* Third Row */}
      <Grid item xs={3}>
        <NumberButton
          value="4"
          onButtonClick={handleClick}
        >
          4
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="5"
          onButtonClick={handleClick}
        >
          5
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="6"
          onButtonClick={handleClick}
        >
          6
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="subtraction"
          onOperationClick={handleOperation}
        >
          -
        </OperationButton>
      </Grid>

      {/* Fourth Row */}
      <Grid item xs={3}>
        <NumberButton
          value="1"
          onButtonClick={handleClick}
        >
          1
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="2"
          onButtonClick={handleClick}
        >
          2
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="3"
          onButtonClick={handleClick}
        >
          3
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="addition"
          onOperationClick={handleOperation}
        >
          +
        </OperationButton>
      </Grid>

      {/* Other Operations */}
      <Grid item xs={3}>
        <OperationButton
          variant='outlined'
          operation="plus_minus"
          onOperationClick={handleOperation}
        >
          +/-
        </OperationButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="0"
          onButtonClick={handleClick}
        >
          0
        </NumberButton>
      </Grid>
      <Grid item xs={3}>
        <NumberButton
          value="."
          onButtonClick={handleClick}
        >
          .
        </NumberButton>
      </Grid>

      <Grid item xs={3}>
        <OperationButton
          variant='contained'
          operation="equals"
          onOperationClick={handleOperation}
        >
          =
        </OperationButton>
      </Grid>
    </Grid>
  );
};

export default ButtonGrid;
