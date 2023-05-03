import { checkAuth } from '../api/auth';

export const isAuthenticated = async (): Promise<boolean> => {
  return await checkAuth();
};