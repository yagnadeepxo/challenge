'use client';

import PriceChart from "@/app/components/priceChart";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Cardano Price Chart</h1>
      <p>About: Cardano is a decentralized public blockchain and cryptocurrency project, founded in 2017 by Charles Hoskinson.</p>
      <p>
        Links:
        <a href="https://www.coingecko.com/en/coins/cardano" target="_blank">CoinGecko</a> |
        <a href="https://cardano.org/" target="_blank">Website</a> |
        <a href="https://twitter.com/Cardano" target="_blank">Twitter</a>
      </p>
      <QueryClientProvider client={new QueryClient}>
        <PriceChart cryptoId="cardano" />
      </QueryClientProvider>
    </div>
  );
}