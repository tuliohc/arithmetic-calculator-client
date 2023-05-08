import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberButton from './NumberButton';


describe('NumberButton', () => {
  it('should render the button with the correct label', () => {
    const label = '7';
    render(<NumberButton value={label}>{label}</NumberButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(label);
  });

  it('should call the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const label = '8';
    render(<NumberButton value={label} onButtonClick={onClickMock}>{label}</NumberButton>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(label);
  });
});
