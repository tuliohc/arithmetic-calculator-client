import axios, { AxiosError } from 'axios';

export interface ErrorResponse {
  error: string;
}

export const extractErrorMessage = (error: any, defaultErrorMessage: string): string => {
  let errorMessage = defaultErrorMessage;
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ErrorResponse>;
    errorMessage = serverError.response?.data.error || errorMessage;
  }
  return errorMessage;
};