import { getBalance } from '../api/user';
import { execGetUserBalance } from './user';

jest.mock('../api/user', () => ({
  getBalance: jest.fn(),
}));

describe('User Service', () => {
  describe('execGetUserBalance', () => {
    it('should call the getBalance API function and return the result', async () => {
      const mockResponse = { balance: '100' };
      // Mock the implementation of getBalance to return mockResponse
      (getBalance as jest.Mock).mockImplementation(async () => mockResponse);

      const result = await execGetUserBalance();
      expect(result).toEqual(mockResponse);
      expect(getBalance).toHaveBeenCalled();
    });

    it('should throw an error if the getBalance API function fails', async () => {
      // Mock the implementation of getBalance to throw an error
      (getBalance as jest.Mock).mockImplementation(async () => {
        throw new Error('Fetch balance failed');
      });

      await expect(execGetUserBalance()).rejects.toThrow('Fetch balance failed');
    });
  });
});
