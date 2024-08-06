'use client';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WalletConnect from './components/walletConnect';
import CryptoCard from './components/cryptoCard';
import TokenFormModal from './components/addTokenModal';
export default function Home() {
  const router = useRouter();
  const cryptos = [
    {  symbol: 'bitcoin', name: 'Bitcoin', logoUrl: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png' },
    {  symbol: 'ethereum', name: 'Ethereum', logoUrl: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png' },
    {  symbol: 'cardano', name: 'Cardano', logoUrl: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png' },
  ];

  const handleClick = (symbol: string) => {
    router.push(`/tokens/${symbol.toLowerCase()}`);
  };

  return (
    <div>
      <WalletConnect />
      <div>
        <br />
      </div>
      <h2>Explore Cryptocurrencies</h2>
      <div>
        <br />
      </div>
      <div>
      <QueryClientProvider client={new QueryClient}>
      <TokenFormModal />
      </QueryClientProvider>
    </div>
      <div>
            <QueryClientProvider client={new QueryClient}>
            {cryptos.map((crypto) => (
          <CryptoCard 
                symbol={crypto.symbol}
                name={crypto.name}
                logoUrl={crypto.logoUrl} 
          />
        ))}
            </QueryClientProvider>
      </div>
    </div>
  );
}