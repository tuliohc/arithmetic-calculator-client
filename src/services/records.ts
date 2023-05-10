import { getRecords, deleteRecord, RecordsResponse, DeleteRecordResponse } from '../api/records';

export const execGetRecords = async (
  page?: number, 
  perPage?: number, 
  search?: string,
  sort?: string
): Promise<RecordsResponse> => {
  return await getRecords(page, perPage, search, sort);
};

export const execDeleteRecord = async (id: string): Promise<DeleteRecordResponse> => {
  return await deleteRecord(id);
};
