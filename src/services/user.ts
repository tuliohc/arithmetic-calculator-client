import { getBalance, BalanceResponse } from '../api/user';

export const execGetUserBalance = async (): Promise<BalanceResponse> => {
  return await getBalance();
};
