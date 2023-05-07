import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface NumberButtonProps extends ButtonProps {
  value?: string;
  onButtonClick?: (value: string) => void;
}

const NumberButton: React.FC<NumberButtonProps> = ({
  value,
  onButtonClick,
  children,
  ...props
}) => {
  const handleClick = () => {
    if (value && onButtonClick) {
      onButtonClick(value);
    }
  };

  return (
    <Button {...props} onClick={handleClick} color="primary" variant="outlined">
      {children}
    </Button>
  );
};

export default NumberButton;
