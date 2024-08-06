'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Logs from '../components/logs';
export default function Home() {
  return (
    <div>
    <QueryClientProvider client={new QueryClient}>
      <Logs/>
      </QueryClientProvider>
    </div>
  );
}