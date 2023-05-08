import React from 'react';
import { render, screen } from '@testing-library/react';
import CalculatorDisplay from './CalculatorDisplay';

const renderDisplay = () => {
  const displayValue = '123';
  render(<CalculatorDisplay displayValue={displayValue} />);
  return displayValue
}

describe('CalculatorDisplay', () => {
  it('renders the display value', () => {
    const value = renderDisplay()
    const displayElement = screen.getByTestId('calculator-display');
    expect(displayElement).toHaveTextContent(value);
  });
});
