'use client'
import React from 'react';
import TokenFormModal from '../components/pumpModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PumpTokens from '../components/pumpDisplay';

const PumpPage = () => {
  return (
    <div>
      <h1>Create a New Token</h1>
      <QueryClientProvider client={new QueryClient}>
            <TokenFormModal />
      </QueryClientProvider>
      <br></br>
      <QueryClientProvider client={new QueryClient}>
      <PumpTokens/>
      </QueryClientProvider>
    </div>
  );
};

export default PumpPage;
