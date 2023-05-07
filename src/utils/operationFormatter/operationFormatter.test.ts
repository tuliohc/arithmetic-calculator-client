import { formatOperationType } from './operationFormatter';

describe('formatOperationType', () => {
  it('should format an operation type', () => {
    expect(formatOperationType('test_operation_type')).toBe('Test Operation Type');
    expect(formatOperationType('singleword')).toBe('Singleword');
    expect(formatOperationType('camelCaseWord')).toBe('CamelCaseWord');
  });
});