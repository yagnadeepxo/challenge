'use client';

import PriceChart from "@/app/components/priceChart";
export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Bitcoin Price Chart</h1>
      <PriceChart />
    </div>
  );
}

