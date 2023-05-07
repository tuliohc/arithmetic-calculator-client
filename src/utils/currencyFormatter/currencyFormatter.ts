export const formatAmount = (value: string): string => {
  const amount = parseFloat(value);
  return `$${amount.toFixed(2)}`;
};