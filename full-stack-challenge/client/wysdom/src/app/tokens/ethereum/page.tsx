'use client';

import PriceChart from "@/app/components/priceChart";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ethereum Price Chart</h1>
      <p>About: Ethereum is an open-source, decentralized blockchain platform, created in 2015 by Vitalik Buterin.</p>
      <p>
        Links:
        <a href="https://www.coingecko.com/en/coins/ethereum" target="_blank">CoinGecko</a> |
        <a href="https://ethereum.org/en/" target="_blank">Website</a> |
        <a href="https://twitter.com/ethereum" target="_blank">Twitter</a>
      </p>
      <QueryClientProvider client={new QueryClient}>
        <PriceChart cryptoId="ethereum" />
      </QueryClientProvider>
    </div>
  );
}