import axios from 'axios';
import * as Utils from '../utils';
import { getRecords, deleteRecord, RecordsResponse } from './records';

jest.mock('axios');
jest.mock('../utils');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedExtractErrorMessage = jest.spyOn(Utils, 'extractErrorMessage');

describe('records API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecords', () => {
    it('should fetch records', async () => {
      const expectedResult: RecordsResponse = {
        page: 1,
        perPage: 10,
        totalCount: 20,
        data: [],
      };
      mockedAxios.get.mockResolvedValue({ data: expectedResult });

      const result = await getRecords(1, 10, 'searchTerm', 'sortTerm');

      expect(result).toEqual(expectedResult);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/records`, {
        params: {
          page: 1,
          perPage: 10,
          search: 'searchTerm',
          sort: 'sortTerm',
        },
        withCredentials: true,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Request error');
      mockedAxios.get.mockRejectedValue(error);
      mockedExtractErrorMessage.mockImplementation(() => {
        throw new Error('Records fetch error');
      });

      await expect(getRecords()).rejects.toThrow('Records fetch error');
      expect(mockedExtractErrorMessage).toHaveBeenCalledWith(error, 'An unknown error occurred while fetching records.');
    });
  });

  describe('deleteRecord', () => {
    it('should delete a record and return the deleted date', async () => {
      const recordId = 'record-id';
      const expectedResult = { date: '2023-05-07' };
      mockedAxios.delete.mockResolvedValue({ data: expectedResult });

      const result = await deleteRecord(recordId);

      expect(result).toEqual(expectedResult);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/records/${recordId}`, {
        withCredentials: true,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Request error');
      mockedAxios.delete.mockRejectedValue(error);
      mockedExtractErrorMessage.mockImplementation(() => {
        throw new Error('Record deletion error');
      });

      await expect(deleteRecord('record-id')).rejects.toThrow('Record deletion error');
      expect(mockedExtractErrorMessage).toHaveBeenCalledWith(error, 'An unknown error occurred while deleting the record.');
    });
  });
});
