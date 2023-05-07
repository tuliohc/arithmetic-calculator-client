import axios from 'axios';
import { extractErrorMessage } from '../utils';
import { performOperation, OperationParams, OperationResponse } from './operations';

jest.mock('axios');
jest.mock('../utils');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedExtractErrorMessage = extractErrorMessage as jest.MockedFunction<typeof extractErrorMessage>;

describe('operations API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('performOperation', () => {
    it('should perform an operation and return the result', async () => {
      const operationData: OperationParams = { operation: 'sum', params: '1,2,3' };
      const expectedResult: OperationResponse = { result: '6', cost: '3' };
      mockedAxios.post.mockResolvedValue({ data: expectedResult });

      const result = await performOperation(operationData);

      expect(result).toEqual(expectedResult);
      expect(mockedAxios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/operations/${operationData.operation}`, {
        params: operationData.params,
      }, {
        withCredentials: true,
      });
    });

    it('should handle errors', async () => {
      const operationData: OperationParams = { operation: 'sum', params: '1,2,3' };
      const error = new Error('Request error');
      mockedAxios.post.mockRejectedValue(error);
      mockedExtractErrorMessage.mockImplementation(() => {
        throw new Error('Operation error');
      });
    
      await expect(performOperation(operationData)).rejects.toThrow('Operation error');
      expect(mockedExtractErrorMessage).toHaveBeenCalledWith(error, 'An unknown error occurred while performing the operation.');
    });
    
  });
});
