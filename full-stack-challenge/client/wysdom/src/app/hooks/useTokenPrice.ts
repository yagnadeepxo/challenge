import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useCreateLog from './useCreateLog';

const fetchTokenPrice = async (symbol: string): Promise<number> => {
  const response = await axios.get(`http://localhost:3001/token/${symbol}`);
  return response.data.price
};

export const useTokenPrice = (symbol: string) => {
  const { createLog } = useCreateLog();
  return useQuery({
    queryKey: ['tokenPrice', symbol],
    queryFn: () => {
      const data = fetchTokenPrice(symbol);
      createLog({
        method: 'GET',
        endpoint: `/:${symbol}`,
        data: 'price fetched successfully',
      })
      return data;
    },
    staleTime: 600000, // 1 hour
    refetchInterval: 600000, // Refetch every 1 hour
  });
};