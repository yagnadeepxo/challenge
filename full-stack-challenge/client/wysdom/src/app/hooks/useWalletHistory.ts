import { useQuery } from '@tanstack/react-query';
import useCreateLog from './useCreateLog';
import axios from 'axios';

// Interfaces
interface Transaction {
  hash: string;
  from_address: string;
  from_address_label: string;
  to_address: string;
  to_address_label: string;
  value: string;
  block_timestamp: string;
}

const fetchTransactionHistory = async (address: string): Promise<Transaction[]> => {
    const response = await axios.get(`http://localhost:3001/history/${address}`);
    return response.data.result;
};

export const useTransactionHistory = (address: string) => {
    const { createLog } = useCreateLog();
    return useQuery({
      queryKey: ['transactionHistory', address],
      queryFn: async () => {
        const data = await fetchTransactionHistory(address);
        createLog({
          method: 'GET',
          endpoint: `/history/${address}`,
          data: 'Transaction history fetched successfully',
        });
        return data;
      },
      enabled: !!address,
      refetchOnWindowFocus: false,
    });
};