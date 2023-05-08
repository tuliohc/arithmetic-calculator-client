import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OperationButton from './OperationButton';

describe('OperationButton', () => {
  it('should render the button with the correct label', () => {
    const label = '+';
    render(<OperationButton operation={label}>{label}</OperationButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(label);
  });

  it('should call the onOperationClick function when clicked', () => {
    const onOperationClickMock = jest.fn();
    const label = '+';
    render(
      <OperationButton operation={label} onOperationClick={onOperationClickMock}>
        {label}
      </OperationButton>
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(onOperationClickMock).toHaveBeenCalledTimes(1);
    expect(onOperationClickMock).toHaveBeenCalledWith(label);
  });
});
