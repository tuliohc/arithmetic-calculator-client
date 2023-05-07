import { checkAuth } from '../api/auth';
import { isAuthenticated } from './auth';

// Mock the checkAuth function from the auth API module
jest.mock('../api/auth', () => ({
  checkAuth: jest.fn(),
}));

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
