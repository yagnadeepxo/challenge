import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

const tokenSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  symbol: z.string().min(1, 'Symbol is required'),
});

type TokenFormInputs = z.infer<typeof tokenSchema>;

export const useCreatePump = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<TokenFormInputs>({
    resolver: zodResolver(tokenSchema),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: TokenFormInputs) => {
      const response = await fetch('http://localhost:3001/pump', {
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
    },
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
  });

  const onSubmit: SubmitHandler<TokenFormInputs> = (data) => {
    mutate(data);
  };

  return { register, handleSubmit, onSubmit, isPending, isError, error, errors };
};
