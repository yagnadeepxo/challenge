'use client';

import PriceChart from "@/app/components/priceChart";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function Home() {
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ethereum Price Chart</h1>
      <QueryClientProvider client={new QueryClient}>
      <PriceChart cryptoId="ethereum" />
      </QueryClientProvider>
    </div>
  );
}

