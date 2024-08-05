import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LogData {
  method: string;
  endpoint: string;
  data: any;
}

const useCreateLog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (logData: LogData) => {
      const response = await fetch('http://localhost:3001/logger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });
      if (!response.ok) {
        throw new Error('Failed to create log');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });

  return {
    createLog: mutation.mutate,
    isLogging: mutation.isPending,
    error: mutation.error,
  };
};

export default useCreateLog;