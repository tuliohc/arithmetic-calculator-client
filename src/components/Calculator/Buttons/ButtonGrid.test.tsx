import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonGrid from './ButtonGrid';

describe('ButtonGrid', () => {
  it('should render all buttons', () => {
    const handleClickMock = jest.fn();
    const handleOperationMock = jest.fn();
    render(<ButtonGrid handleClick={handleClickMock} handleOperation={handleOperationMock} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(20);
  });

  it('should call the handleClick function when a number button is clicked', () => {
    const handleClickMock = jest.fn();
    const handleOperationMock = jest.fn();
    render(<ButtonGrid handleClick={handleClickMock} handleOperation={handleOperationMock} />);
    const buttonElement = screen.getByText('5');
    fireEvent.click(buttonElement);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith('5');
  });

  it('should call the handleOperation function when an operation button is clicked', () => {
    const handleClickMock = jest.fn();
    const handleOperationMock = jest.fn();
    render(<ButtonGrid handleClick={handleClickMock} handleOperation={handleOperationMock} />);
    const buttonElement = screen.getByText('+');
    fireEvent.click(buttonElement);
    expect(handleOperationMock).toHaveBeenCalledTimes(1);
    expect(handleOperationMock).toHaveBeenCalledWith('addition');
  });
});
