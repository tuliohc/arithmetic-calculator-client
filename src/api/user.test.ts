import axios from 'axios';
import * as Utils from '../utils';
import { getBalance, BalanceResponse } from './user';

jest.mock('axios');
jest.mock('../utils');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedExtractErrorMessage = jest.spyOn(Utils, 'extractErrorMessage');

describe('user API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should fetch the user balance', async () => {
      const expectedResult: BalanceResponse = { balance: '1000' };
      mockedAxios.get.mockResolvedValue({ data: expectedResult });

      const result = await getBalance();

      expect(result).toEqual(expectedResult);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/users/balance`, {
        withCredentials: true,
      });
    });

    it('should handle errors', async () => {
      const error = new Error('Request error');
      mockedAxios.get.mockRejectedValue(error);
      mockedExtractErrorMessage.mockImplementation(() => {
        throw new Error('Balance fetch error');
      });

      await expect(getBalance()).rejects.toThrow('Balance fetch error');
      expect(mockedExtractErrorMessage).toHaveBeenCalledWith(error, 'An unknown error occurred while fetching balance.');
    });
  });
});
