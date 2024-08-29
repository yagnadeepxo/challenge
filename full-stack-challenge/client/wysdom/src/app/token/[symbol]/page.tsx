'use client';
import React from 'react';
import Orders from '@/app/components/orders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const TokenPage = ({ params }: { params: { symbol: string } }) => {
  const { symbol } = params;

  return (
    <div>
      <h1>Details for {symbol}</h1>
      <QueryClientProvider client={new QueryClient()}>
        <Orders symbol={symbol} />
      </QueryClientProvider>
    </div>
  );
};

export default TokenPage;
