import React from 'react';
import Link from 'next/link';
import { useFetchPump } from '../hooks/useFetchPump';

const PumpPage = () => {
  const { data, isLoading, isError } = useFetchPump();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      {data && data.map((token, index) => (
        <Link key={index} href={`/token/${token.symbol}`}>
          <div className="card">
            <h2>{token.name}</h2>
            <p>Symbol: {token.symbol}</p>
            <p>Price: {token.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PumpPage;
