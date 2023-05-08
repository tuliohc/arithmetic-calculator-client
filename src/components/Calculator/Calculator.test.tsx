import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calculator from './Calculator';
import { LoadingProvider } from '../../contexts/LoadingProvider';
import { performOperation } from '../../api/operations';


const renderCalculator = () => {
  render(
    <LoadingProvider>
      <Calculator />
    </LoadingProvider>
  );
};

// Mock the performOperation API call
jest.mock('../../api/operations', () => ({
  performOperation: jest.fn(),
}));

describe('Calculator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the component', () => {
    renderCalculator();
    const calculatorTitle = screen.getByText('CALCULATOR');
    expect(calculatorTitle).toBeInTheDocument();
  });

  describe('handleClick', () => {
    it('should update displayValue with the clicked number', () => {
      renderCalculator();
      const button7 = screen.getByText('7');
      fireEvent.click(button7);
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      expect(displayValue).toHaveTextContent('7');
    });
  });

  describe('handleDelete', () => {
    it('should reset displayValue and operationDisplay', () => {
      renderCalculator();
      const button7 = screen.getByText('7');
      fireEvent.click(button7);
      const deleteButton = screen.getByText('AC');
      fireEvent.click(deleteButton);
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      expect(displayValue).toHaveTextContent('0');
    });
  });

  describe('handleBinaryOperation', () => {
    it('should update operationDisplay and clear displayValue', () => {
      renderCalculator();
      const button7 = screen.getByText('7');
      fireEvent.click(button7);
      const addButton = screen.getByText('+');
      fireEvent.click(addButton);
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      const operationDisplay = screen.getAllByTestId('calculator-display')[0];
      expect(displayValue).toHaveTextContent('');
      expect(operationDisplay).toHaveTextContent('7 +');
    });

    it('should perform multiplication correctly', async () => {
      (performOperation as jest.Mock).mockResolvedValue({
        result: '12',
        cost: '2',
        date: '2023-05-08T00:00:00.000Z',
      });
  
      renderCalculator();
      const button3 = screen.getByText('3');
      fireEvent.click(button3);
      const multiplyButton = screen.getByText('×');
      fireEvent.click(multiplyButton);
      const button4 = screen.getByText('4');
      fireEvent.click(button4);
      const equalsButton = screen.getByText('=');
      fireEvent.click(equalsButton);
  
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      await waitFor(() => expect(displayValue.textContent).toBe('12'));
    });

    it('should perform division correctly', async () => {
      (performOperation as jest.Mock).mockResolvedValue({
        result: '2',
        cost: '2',
        date: '2023-05-08T00:00:00.000Z',
      });
  
      renderCalculator();
      const button8 = screen.getByText('8');
      fireEvent.click(button8);
      const divideButton = screen.getByText('÷');
      fireEvent.click(divideButton);
      const button4 = screen.getByText('4');
      fireEvent.click(button4);
      const equalsButton = screen.getByText('=');
      fireEvent.click(equalsButton);
  
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      await waitFor(() => expect(displayValue.textContent).toBe('2'));
    });
  });

  describe('handleUnaryOperation', () => {
    it('should update displayValue with the result of the operation', async () => {
      (performOperation as jest.Mock).mockResolvedValue({
        result: '3',
        cost: '3',
        date: '2023-05-08T00:00:00.000Z',
      });

      renderCalculator();
      const button9 = screen.getByText('9');
      fireEvent.click(button9);
      const squareRootButton = screen.getByText('√');
      
      fireEvent.click(squareRootButton);
      
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      await waitFor(() => expect(displayValue.textContent).toBe('3'));
    });

    it('should display error message for invalid operation', async () => {
      (performOperation as jest.Mock).mockRejectedValue('Invalid operation');
  
      renderCalculator();
      const button9 = screen.getByText('9');
      fireEvent.click(button9);
      const squareRootButton = screen.getByText('√');
      fireEvent.click(squareRootButton);
  
      await waitFor(() => {
        const displayValue = screen.getAllByTestId('calculator-display')[1];
        expect(displayValue.textContent).toBe('0');
      });
  
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Invalid operation');
    });
  });
  
  describe('handlePlusMinus', () => {
    it('should toggle the sign of the displayValue', () => {
      renderCalculator();
    
      // Test for changing a positive number to a negative number
      const button7 = screen.getByText('7');
      fireEvent.click(button7);
      const plusMinusButton = screen.getByText('+/-');
      fireEvent.click(plusMinusButton);
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      expect(parseFloat(displayValue.textContent || '0')).toBe(-7);
    
      // Test for changing a negative number to a positive number
      fireEvent.click(plusMinusButton);
      expect(parseFloat(displayValue.textContent || '0')).toBe(7);
    });
  });

  describe('handleOperation', () => {
    it('should handle the plus_minus operation correctly', () => {
      renderCalculator();
      const button7 = screen.getByText('7');
      fireEvent.click(button7);
      const plusMinusButton = screen.getByText('+/-');
      fireEvent.click(plusMinusButton);
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      expect(parseFloat(displayValue.textContent || '0')).toBe(-7);
    });
  });

  describe('handleEquals', () => {
    it('should update displayValue with the result of the valid binary operation', async () => {
      (performOperation as jest.Mock).mockResolvedValueOnce({
        result: '1',
        cost: '1',
        errorMessage: '',
      });

      renderCalculator();
      const button2 = screen.getByText('3');
      fireEvent.click(button2);
      const addButton = screen.getByText('-');
      fireEvent.click(addButton);
      const button3 = screen.getByText('2');
      fireEvent.click(button3);
      const equalsButton = screen.getByText('=');
      fireEvent.click(equalsButton);
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      await waitFor(() => expect(displayValue).toHaveTextContent('1'));
    });
    
    it('should display a Snackbar with a success message when an operation is successful', async () => {
      (performOperation as jest.Mock).mockResolvedValueOnce({
        result: '3',
        cost: '3',
        errorMessage: '',
      });

      renderCalculator();
      const button9 = screen.getByText('9');
      fireEvent.click(button9);
      const squareRootButton = screen.getByText('√');
      fireEvent.click(squareRootButton);
      expect(await screen.findByText(/Your operation had a cost of/i)).toBeInTheDocument();
    });
  });
  
  describe('Random String', () => {
    it('should display a random string when the RS button is clicked', async () => {
      const randomString = 'abcde';
      (performOperation as jest.Mock).mockResolvedValueOnce({
        result: randomString,
        cost: '4',
        errorMessage: '',
      });
    
      renderCalculator();
    
      const rsButton = screen.getByText('RS');
      fireEvent.click(rsButton);
    
      const displayValue = screen.getAllByTestId('calculator-display')[1];
      await waitFor(() => expect(displayValue.textContent).toBe(randomString));
    
      // Check if Snackbar shows the success message
      expect(await screen.findByText(/Your operation had a cost of/i)).toBeInTheDocument();
    });
  })
});