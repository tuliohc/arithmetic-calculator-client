import axios from 'axios';
import { extractErrorMessage } from '../utils';
import { API_URL } from './api';

export interface BalanceResponse {
  balance: string;
}

export const getBalance = async (): Promise<BalanceResponse> => {
  try {
    const response = await axios.get<BalanceResponse>(`${API_URL}/users/balance`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw extractErrorMessage(error, "An unknown error occurred while fetching balance.");
  }
};






