'use client';

import Image from 'next/image';
import { useTokenPrice } from '../hooks/useTokenPrice';
import Link from 'next/link';
import { id } from 'ethers';

interface CryptoCardProps {
  symbol: string;
  name: string;
  logoUrl: string;
}

export default function CryptoCard({ symbol, name, logoUrl }: CryptoCardProps) {
  const { data: price, isLoading, isError } = useTokenPrice(symbol);

  return (
    <Link href={`/tokens/${symbol}`} passHref>
      <div 
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '8px',
          margin: '8px',
          width: '100px', 
          height: '100px', 
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center', 
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <Image src={logoUrl} alt={`${name} logo`} width={32} height={32} />
        <div style={{ marginTop: '8px' }}>
          <h3 style={{ fontSize: '14px', margin: '4px 0' }}>{name}</h3>
          <p style={{ fontSize: '12px', margin: '2px 0' }}>{symbol}</p>
          {isLoading && <p style={{ fontSize: '12px', margin: '2px 0' }}>Loading...</p>}
          {isError && <p style={{ fontSize: '12px', margin: '2px 0' }}>Error</p>}
          {price !== undefined && <p style={{ fontSize: '12px', margin: '2px 0' }}>${price.toFixed(2)}</p>}
        </div>
      </div>
    </Link>
  );
}