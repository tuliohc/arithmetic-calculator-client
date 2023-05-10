import { performOperation, OperationParams, OperationResponse } from '../api/operations';
import { execOperation } from './operations';

jest.mock('../api/operations', () => ({
  performOperation: jest.fn(),
}));

describe('execOperation', () => {
  it('should return the result of the operation', async () => {
    // Mock the implementation of performOperation to return a fixed result
    const mockResult: OperationResponse = { result: '5', cost: '1' };
    (performOperation as jest.Mock).mockImplementation(async () => mockResult);

    const operationData: OperationParams = { operation: 'add', params: '2,3' };
    const result = await execOperation(operationData);

    expect(result).toBe(mockResult);
    expect(performOperation).toHaveBeenCalledWith(operationData);
  });

  it('should throw an error if the operation fails', async () => {
    // Mock the implementation of performOperation to throw an error
    (performOperation as jest.Mock).mockImplementation(async () => {
      throw new Error('Operation failed');
    });

    const operationData: OperationParams = { operation: 'add', params: '2,3' };

    await expect(execOperation(operationData)).rejects.toThrow('Operation failed');
  });
});
