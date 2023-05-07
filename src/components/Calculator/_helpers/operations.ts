export function getOperationName(operationSymbol: string): string {
  switch (operationSymbol) {
    case '+':
      return 'addition';
    case '-':
      return 'subtraction';
    case '×':
      return 'multiplication';
    case '÷':
      return 'division';
    default:
      return '';
  }
};