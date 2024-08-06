import { useQuery } from '@tanstack/react-query';
import useCreateLog from './useCreateLog';
import axios from 'axios';

interface NFTBalance {
    token_address: string;
    token_id: string;
    contract_type: string;
    owner_of: string;
    name: string;
    symbol: string;
    amount: string;
}

const fetchNFTBalance = async (address: string): Promise<NFTBalance[]> => {
    const response = await axios.get(`http://localhost:3001/nft/${address}`);
    return response.data.result;
};

export const useNFTBalance = (address: string) => {
    const { createLog } = useCreateLog();
    return useQuery({
      queryKey: ['nftBalance', address],
      queryFn: async () => {
        const data = await fetchNFTBalance(address);
        createLog({
          method: 'GET',
          endpoint: `/nft/${address}`,
          data: 'NFT balance fetched successfully',
        });
        return data;
      },
      enabled: !!address,
      refetchOnWindowFocus: false,
    });
  };