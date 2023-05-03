import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signIn = async (username: string, password: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/users/signin`, {
      username,
      password,
    },{
      withCredentials: true,
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/users/check-auth`, {
      withCredentials: true,
    });

    console.log('checkAuth response:', response.data);
    return response.data.authenticated;
  } catch (error) {
    console.error('Error during authentication check:', error);
    return false;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    return await axios.post(`${API_URL}/users/signout`, {}, { withCredentials: true });
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error;
  }
}