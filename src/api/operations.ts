import axios from 'axios';
import { extractErrorMessage } from '../utils/extractErrorMessage';

const API_URL = process.env.REACT_APP_API_URL;

export interface OperationResponse {
  result: string;
}

export interface OperationParams {
  operation: string;
  params: string;
}

export const performOperation = async (operationData: OperationParams): Promise<OperationResponse> => {
  try {
    const response = await axios.post<OperationResponse>(`${API_URL}/operations/${operationData.operation}`, {
      params: operationData.params,
    }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw extractErrorMessage(error, "An unknown error occurred while performing the operation.");
  }
};
