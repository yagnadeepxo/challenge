import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import useCreateLog from './useCreateLog';


const tokenSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  imageURL: z.string().url('Invalid URL'),
  address: z.string().min(1, 'Address is required'),
  decimals: z.number().min(0, 'Decimals must be a non-negative number'),
  ticker: z.string().min(1, 'Ticker is required'),
});

const createToken = async (data: z.infer<typeof tokenSchema>) => {
  const response = await fetch('http://localhost:3001/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create token');
  }

  return response.json();
};

export const useCreateToken = () => {
  const queryClient = useQueryClient();
  const {createLog} = useCreateLog();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(tokenSchema),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
      toast({
        title: 'Success',
        description: 'Token created successfully',
        
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSettled: (data, error) => {
      createLog({
        method: 'POST',
        endpoint: '/create/',
        data: {
          response: data ? { 'data': 'token created' } : null,
          error: error ? error.message : null
        }
      });
    }
  });

  const onSubmit = (data: z.infer<typeof tokenSchema>) => {
    mutate(data);
  };

  return { register, handleSubmit, onSubmit, isPending, isError, error, errors };
};