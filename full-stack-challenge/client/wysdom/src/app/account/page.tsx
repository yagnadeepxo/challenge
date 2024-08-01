'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Account } from '../components/account';

export default function Home() {
  return (
    <div>
    <QueryClientProvider client={new QueryClient}>
      <Account/>
      </QueryClientProvider>
    </div>
  );
}