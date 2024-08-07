'use client';

import { useRouter } from 'next/router';
import PriceChart from "@/app/components/priceChart";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Bitcoin Price Chart</h1>
      <p>About: Bitcoin is the first decentralized cryptocurrency, created in 2009 by Satoshi Nakamoto.</p>
      <p>
        Links:
        <a href="https://www.coingecko.com/en/coins/bitcoin" target="_blank">CoinGecko</a> |
        <a href="https://www.bitcoinfoundation.org/" target="_blank">Website</a> |
        <a href="https://twitter.com/Bitcoin" target="_blank">Twitter</a>
      </p>
      <QueryClientProvider client={new QueryClient}>
        <PriceChart cryptoId="bitcoin" />
      </QueryClientProvider>
    </div>
  );
}