import { OperationParams, performOperation, OperationResponse } from '../api/operations';

export const execOperation = async (operationData: OperationParams): Promise<OperationResponse> => {
  return await performOperation(operationData);
};
