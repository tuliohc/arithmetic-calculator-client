import { formatDate } from './dateFormatter';

describe('formatDate', () => {
  it('should format a given date string', () => {
    const formatDateOnly = (dateString: string): string => {
      return dateString.slice(0, 10);
    };
    expect(formatDateOnly(formatDate('2023-05-07T15:30:00Z', 'en-US'))).toBe('05/07/2023');
    expect(formatDateOnly(formatDate('1995-12-17T03:24:00', 'en-US'))).toBe('12/17/1995');
  });
});