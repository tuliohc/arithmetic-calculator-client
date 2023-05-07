import axios from 'axios';
import { signIn, checkAuth, signOut } from './auth';
import { extractErrorMessage } from '../utils';

jest.mock('axios');
jest.mock('../utils');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedExtractErrorMessage = extractErrorMessage as jest.MockedFunction<typeof extractErrorMessage>;

describe('auth API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('signIn', () => {
    it('should call the correct endpoint and handle success', async () => {
      mockedAxios.post.mockResolvedValue({});
      const username = 'testuser';
      const password = 'testpass';
  
      await signIn(username, password);
  
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/signin'),
        { username: username.toLocaleLowerCase(), password },
        { withCredentials: true }
      );
    });
  
    it('should handle errors', async () => {
      const error = new Error('Request error');
      mockedAxios.post.mockRejectedValue(error);
      mockedExtractErrorMessage.mockImplementation(() => {
        throw new Error('Sign-in error');
      });
    
      await expect(signIn('testuser', 'testpass')).rejects.toThrow('Sign-in error');
      expect(mockedExtractErrorMessage).toHaveBeenCalledWith(error, 'An unknown error occurred during sign-in.');
    });
  })

  describe('checkAuth', () => {
    it('should call the correct endpoint and handle success', async () => {
      const responseData = { authenticated: true };
      mockedAxios.get.mockResolvedValue({ data: responseData });
  
      const result = await checkAuth();
  
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/users/check-auth'),
        { withCredentials: true }
      );
      expect(result).toBe(responseData.authenticated);
    });
  
    test('should handle errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Request error'));
  
      const result = await checkAuth();
  
      expect(result).toBe(false);
    });
  })

  describe('signOut', () => {
    it('should call the correct endpoint and handle success', async () => {
      mockedAxios.post.mockResolvedValue({});
  
      await signOut();
  
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/signout'),
        {},
        { withCredentials: true }
      );
    });
  
    it('should handle errors', async () => {
      const error = new Error('Request error');
      mockedAxios.post.mockRejectedValue(error);
      mockedExtractErrorMessage.mockImplementation(() => {
        throw new Error('Sign-out error');
      });
    
      await expect(signOut()).rejects.toThrow('Sign-out error');
      expect(mockedExtractErrorMessage).toHaveBeenCalledWith(error, 'Error during sign-out');
    });
  })
});
