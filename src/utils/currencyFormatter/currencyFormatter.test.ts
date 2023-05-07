import { formatAmount } from './currencyFormatter';

describe('formatAmount', () => {
  it('should format a given amount', () => {
    expect(formatAmount('1234.5678')).toBe('$1234.57');
    expect(formatAmount('1000')).toBe('$1000.00');
    expect(formatAmount('0')).toBe('$0.00');
  });
});