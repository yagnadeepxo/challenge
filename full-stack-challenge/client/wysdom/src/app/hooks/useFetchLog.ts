import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Log {
    id: number;
    method: string;
    endpoint: string;
    data: {
      [key: string]: any;
    };
    createdAt: string;
}

const fetchLogs = async (): Promise<Log[]> => {
    const response = await axios.get(`http://localhost:3001/logger`);
    return response.data
}

export const useFetchLog = () => {
  return useQuery<Log[]>({
    queryKey: ['logs'],
    queryFn: fetchLogs,
  });
}