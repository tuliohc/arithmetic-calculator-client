import { getRecords, deleteRecord } from '../api/records';
import { execGetRecords, execDeleteRecord } from './records';

jest.mock('../api/records', () => ({
  getRecords: jest.fn(),
  deleteRecord: jest.fn(),
}));

describe('Records Service', () => {
  describe('execGetRecords', () => {
    it('should call the getRecords API function and return the result', async () => {
      const mockResponse = { page: 1, perPage: 10, totalCount: 100, data: [] };
      // Mock the implementation of getRecords to return mockResponse
      (getRecords as jest.Mock).mockImplementation(async () => mockResponse);

      const result = await execGetRecords(1, 10, 'test', 'desc');
      expect(result).toEqual(mockResponse);
      expect(getRecords).toHaveBeenCalledWith(1, 10, 'test', 'desc');
    });

    it('should throw an error if the getRecords API function fails', async () => {
      // Mock the implementation of getRecords to throw an error
      (getRecords as jest.Mock).mockImplementation(async () => {
        throw new Error('Fetch records failed');
      });

      await expect(execGetRecords(1, 10, 'test', 'desc')).rejects.toThrow('Fetch records failed');
    });
  });

  describe('execDeleteRecord', () => {
    it('should call the deleteRecord API function and return the result', async () => {
      const mockResponse = { date: '2023-05-10' };
      // Mock the implementation of deleteRecord to return mockResponse
      (deleteRecord as jest.Mock).mockImplementation(async () => mockResponse);

      const result = await execDeleteRecord('testId');
      expect(result).toEqual(mockResponse);
      expect(deleteRecord).toHaveBeenCalledWith('testId');
    });

    it('should throw an error if the deleteRecord API function fails', async () => {
      // Mock the implementation of deleteRecord to throw an error
      (deleteRecord as jest.Mock).mockImplementation(async () => {
        throw new Error('Delete record failed');
      });

      await expect(execDeleteRecord('testId')).rejects.toThrow('Delete record failed');
    });
  });
});
