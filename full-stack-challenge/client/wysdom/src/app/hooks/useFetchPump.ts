import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Pump {
    name: string;
    symbol: string;
    totalSupply: number;
    availableSupply: number;
    price: number;
    marketCap: number;
    createdAt: Date;
}

const fetchPumpData = async (): Promise<Pump[]> => {
    const response = await axios.get(`http://localhost:3001/pump`);
    return response.data;
  }
  
  export const useFetchPump = () => {
    return useQuery<Pump[]>({
      queryKey: ['pumpData'],
      queryFn: fetchPumpData,
    });
  }