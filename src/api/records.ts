import axios from 'axios';

export const getRecords = async (): Promise<any[]> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${API_URL}/records`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};