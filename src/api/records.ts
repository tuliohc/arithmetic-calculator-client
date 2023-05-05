import axios from 'axios';
import { extractErrorMessage } from '../utils/extractErrorMessage';

const API_URL = process.env.REACT_APP_API_URL;

export interface Record {
  _id: string;
  user: string;
  amount: string;
  userBalance: string;
  operationResponse: string;
  deletedAt: string | null;
  date: string;
  operation_type: string;
}

export interface RecordsResponse {
  page: number;
  perPage: number;
  totalCount: number;
  data: Record[];
}

export interface DeleteRecordResponse {
  date: string;
}

export const getRecords = async (page?: number, perPage?: number, search?: string): Promise<RecordsResponse> => {
  try {
    const response = await axios.get(`${API_URL}/records`, {
      params: {
        page,
        perPage,
        search,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw extractErrorMessage(error, "An unknown error occurred while fetching records.");
  }
};

export const deleteRecord = async (id: string): Promise<DeleteRecordResponse> => {
  try {
    const result = await axios.delete(`${API_URL}/records/${id}`, {
      withCredentials: true,
    });
    return result.data
  } catch (error) {
    throw extractErrorMessage(error, "An unknown error occurred while deleting the record.");
  }
};