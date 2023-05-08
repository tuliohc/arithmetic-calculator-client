import { getOperationName } from "./operations";

describe('getOperationName', () => {
  it('should return "addition" for "+" symbol', () => {
    expect(getOperationName('+')).toBe('addition');
  });

  it('should return "subtraction" for "-" symbol', () => {
    expect(getOperationName('-')).toBe('subtraction');
  });

  it('should return "multiplication" for "×" symbol', () => {
    expect(getOperationName('×')).toBe('multiplication');
  });

  it('should return "division" for "÷" symbol', () => {
    expect(getOperationName('÷')).toBe('division');
  });

  it('should return an empty string for an unknown symbol', () => {
    expect(getOperationName('#')).toBe('');
  });
});
