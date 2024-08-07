'use client';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WalletConnect from './components/walletConnect';
import CryptoCard from './components/cryptoCard';
import TokenFormModal from './components/addTokenModal';


export default function Home() {
  const router = useRouter();
  const cryptos = [
    { symbol: 'bitcoin', name: 'Bitcoin', logoUrl: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png' },
    { symbol: 'ethereum', name: 'Ethereum', logoUrl: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png' },
    { symbol: 'cardano', name: 'Cardano', logoUrl: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png' },
  ];
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <WalletConnect />
        <div className="flex gap-4">
          <button className="btn" onClick={() => router.push('/logs')}>Logs</button>
          <button className="btn" onClick={() => router.push('/account')}>Account</button>
        </div>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Explore Cryptocurrencies</h2>
          <QueryClientProvider client={new QueryClient}>
            <TokenFormModal />
          </QueryClientProvider>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <QueryClientProvider client={new QueryClient}>
            {cryptos.map((crypto) => (
              <CryptoCard 
                key={crypto.symbol}
                symbol={crypto.symbol}
                name={crypto.name}
                logoUrl={crypto.logoUrl} 
              />
            ))}
          </QueryClientProvider>
        </section>
      </main>
    </div>
  );
}
