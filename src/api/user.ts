import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

interface ErrorResponse {
  error: string;
}

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
    let errorMessage = "An unknown error occurred while fetching balance.";
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ErrorResponse>;
      errorMessage = serverError.response?.data.error || errorMessage;
    }
    throw errorMessage;
  }
};






