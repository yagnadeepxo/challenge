import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useOrder = () => {
  const queryClient = useQueryClient();

  const buyMutation = useMutation({
    mutationFn: async (data: { symbol: string; amount: number }) => {
      const response = await axios.post('http://localhost:3001/api/pump/buy', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pump'] });
    },
  });

  const sellMutation = useMutation({
    mutationFn: async (data: { symbol: string; amount: number }) => {
      const response = await axios.post('http://localhost:3001/api/pump/sell', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pump'] });
    },
  });

  return {
    buyMutation,
    sellMutation,
  };
};

export default useOrder;