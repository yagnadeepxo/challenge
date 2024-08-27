'use client';

import { useParams } from 'next/navigation';
import PriceChart from '../components/priceChart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function CryptoPage() {
  const params = useParams();
  const cryptoId = params.cryptoId as string;

  const cryptoDetails: { [key: string]: { name: string, about: string, links: { coingecko: string, website: string, twitter: string } } } = {
    bitcoin: {
      name: 'Bitcoin',
      about: 'Bitcoin is the first decentralized cryptocurrency, created in 2009 by Satoshi Nakamoto.',
      links: {
        coingecko: 'https://www.coingecko.com/en/coins/bitcoin',
        website: 'https://www.bitcoinfoundation.org/',
        twitter: 'https://twitter.com/Bitcoin'
      }
    },
    ethereum: {
      name: 'Ethereum',
      about: 'Ethereum is an open-source, decentralized blockchain platform, created in 2015 by Vitalik Buterin.',
      links: {
        coingecko: 'https://www.coingecko.com/en/coins/ethereum',
        website: 'https://ethereum.org/en/',
        twitter: 'https://twitter.com/ethereum'
      }
    },
    cardano: {
      name: 'Cardano',
      about: 'Cardano is a decentralized public blockchain and cryptocurrency project, founded in 2017 by Charles Hoskinson.',
      links: {
        coingecko: 'https://www.coingecko.com/en/coins/cardano',
        website: 'https://cardano.org/',
        twitter: 'https://twitter.com/Cardano'
      }
    }
  };

  if (!cryptoId || !cryptoDetails[cryptoId]) {
    return <p>Loading...</p>;
  }

  const { name, about, links } = cryptoDetails[cryptoId];

  return (
    <div style={{ padding: '20px' }}>
      <h1>{name} Price Chart</h1>
      <p>About: {about}</p>
      <p>
        Links:
        <a href={links.coingecko} target="_blank" rel="noopener noreferrer">CoinGecko</a> |
        <a href={links.website} target="_blank" rel="noopener noreferrer">Website</a> |
        <a href={links.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
      </p>
      <QueryClientProvider client={new QueryClient()}>
        <PriceChart cryptoId={cryptoId} />
      </QueryClientProvider>
    </div>
  );
}
