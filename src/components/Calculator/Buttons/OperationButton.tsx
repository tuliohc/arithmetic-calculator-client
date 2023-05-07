import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface OperationButtonProps extends ButtonProps {
  operation: string;
  onOperationClick?: (operation: string) => void;
}

const OperationButton: React.FC<OperationButtonProps> = ({
  operation,
  onOperationClick,
  variant,
  children,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (operation && onOperationClick) {
      onOperationClick(operation);
    }
  };

  return (
    <Button {...props} onClick={handleClick} color="primary" variant={variant}>
      {children}
    </Button>
  );
};

export default OperationButton;
