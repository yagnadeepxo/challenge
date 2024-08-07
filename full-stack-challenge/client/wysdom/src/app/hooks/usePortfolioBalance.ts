import { useQuery } from '@tanstack/react-query';
import useCreateLog from './useCreateLog';
import axios from 'axios';

interface TokenBalance {
  token_address: string;
  symbol: string;
  balance: string;
  decimals: number;
}

const fetchTokenBalances = async (address: string): Promise<TokenBalance[]> => {
  const response = await axios.get(`http://localhost:3001/token-balances/${address}`);
  return response.data;
};

export const usePortfolioBalance = (address: string) => {
  const { createLog } = useCreateLog();
  return useQuery({
    queryKey: ['tokenBalances', address],
    queryFn: async () => {
      const data = await fetchTokenBalances(address);
      createLog({
        method: 'GET',
        endpoint: `/token-balances?address=${address}`,
        data: 'balance fetched successfully',
      })
      return data.map((token: TokenBalance) => ({
        ...token,
        balance: parseFloat(token.balance) / Math.pow(10, token.decimals),
      }));
    },
    enabled: !!address,
    refetchOnWindowFocus: false,
  });
};