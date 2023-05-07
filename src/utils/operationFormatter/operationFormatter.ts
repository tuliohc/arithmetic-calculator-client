export const formatOperationType = (operationType: string) => {
  const operationTypeWords = operationType.split('_');
  const capitalizedWords = operationTypeWords.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
};