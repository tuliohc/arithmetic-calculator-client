import axios from 'axios';
import { extractErrorMessage } from '../utils';
import { API_URL } from './api';


export interface OperationResponse {
  result: string;
  cost: string;
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
