import { checkAuth, signIn, signOut } from '../api/auth';
import { isAuthenticated, execSignIn, execSignOut } from './auth';

jest.mock('../api/auth', () => ({
  checkAuth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe('Auth Service', () => {
  describe('isAuthenticated', () => {
    it('should return true if the user is authenticated', async () => {
      // Mock the implementation of checkAuth to return true
      (checkAuth as jest.Mock).mockImplementation(async () => true);

      const result = await isAuthenticated();
      expect(result).toBe(true);
    });

    it('should return false if the user is not authenticated', async () => {
      // Mock the implementation of checkAuth to return false
      (checkAuth as jest.Mock).mockImplementation(async () => false);

      const result = await isAuthenticated();
      expect(result).toBe(false);
    });
  });

  describe('execSignIn', () => {
    it('should call the signIn API function without throwing an error', async () => {
      // Mock the implementation of signIn to not throw an error
      (signIn as jest.Mock).mockImplementation(async () => { });
  
      await expect(execSignIn('test', 'test')).resolves.toBeUndefined();
      expect(signIn).toHaveBeenCalledWith('test', 'test');
    });

    it('should throw an error if the signIn API function fails', async () => {
      // Mock the implementation of signIn to throw an error
      (signIn as jest.Mock).mockImplementation(async () => {
        throw new Error('Sign-in failed');
      });

      await expect(execSignIn('test', 'test')).rejects.toThrow('Sign-in failed');
    });
  });

  describe('execSignOut', () => {
    it('should call the signOut API function without throwing an error', async () => {
      // Mock the implementation of signOut to not throw an error
      (signOut as jest.Mock).mockImplementation(async () => { });
  
      await expect(execSignOut()).resolves.toBeUndefined();
      expect(signOut).toHaveBeenCalled();
    });

    it('should throw an error if the signOut API function fails', async () => {
      // Mock the implementation of signOut to throw an error
      (signOut as jest.Mock).mockImplementation(async () => {
        throw new Error('Sign-out failed');
      });

      await expect(execSignOut()).rejects.toThrow('Sign-out failed');
    });
  });
});