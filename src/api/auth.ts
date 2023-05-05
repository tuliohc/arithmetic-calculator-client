import axios from 'axios';
import { extractErrorMessage } from '../utils/extractErrorMessage';


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
    throw extractErrorMessage(error, "An unknown error occurred during sign-in.");
  }
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/users/check-auth`, {
      withCredentials: true,
    });
    return response.data.authenticated;
  } catch (error) {
    // console.error('Error during authentication check:', error);
    return false;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    return await axios.post(`${API_URL}/users/signout`, {}, { withCredentials: true });
  } catch (error) {
    throw extractErrorMessage(error, "Error during sign-out");
  }
}