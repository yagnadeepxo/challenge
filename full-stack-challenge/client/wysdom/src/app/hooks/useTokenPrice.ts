import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTokenPrice = async (symbol: string): Promise<number> => {
  const response = await axios.get(`http://localhost:3001/token/${symbol}`);
  return response.data.price
};

export const useTokenPrice = (symbol: string) => {
  return useQuery({
    queryKey: ['tokenPrice', symbol],
    queryFn: () => fetchTokenPrice(symbol),
    staleTime: 600000, // 1 hour
    refetchInterval: 60000, // Refetch every 1 minute
  });
};