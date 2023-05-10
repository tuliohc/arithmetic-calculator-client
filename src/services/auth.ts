import { signIn as apiSignIn, signOut as apiSignOut, checkAuth } from '../api/auth';

export const isAuthenticated = async (): Promise<boolean> => {
  return await checkAuth();
};

export const execSignIn = async (username: string, password: string): Promise<void> => {
  try {
    await apiSignIn(username, password);
  } catch (error) {
    throw error;
  }
};

export const execSignOut = async (): Promise<void> => {
  try {
    await apiSignOut();
  } catch (error) {
    throw error;
  }
};
