// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';


// interface CryptoCardProps {
//   symbol: string;
//   name: string;
//   logoUrl: string;
// }

// export default function CryptoCard({ symbol, name, logoUrl }: CryptoCardProps) {
//   const [price, setPrice] = useState<number | null>(null);
  
//   useEffect(() => {
//     const fetchPrice = async () => {
//       try {
//         const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`);
//         const data = await response.json();
//         setPrice(data[symbol.toLowerCase()].usd);
//       } catch (error) {
//         console.error('Error fetching price:', error);
//       }
//     };

//     fetchPrice();
//   }, [symbol]);


//   return (
//     <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px', display: 'flex', alignItems: 'center' }}>
//       <Image src={logoUrl} alt={`${name} logo`} width={32} height={32} />
//       <div style={{ marginLeft: '16px' }}>
//         <h3>{name}</h3>
//         <p>{symbol}</p>
//         {price !== null ? <p>${price.toFixed(2)}</p> : <p>Loading price...</p>}
//       </div>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { useTokenPrice } from '../hooks/useTokenPrice';

interface CryptoCardProps {
  symbol: string;
  name: string;
  logoUrl: string;
}

export default function CryptoCard({ symbol, name, logoUrl }: CryptoCardProps) {
  const { data: price, isLoading, isError } = useTokenPrice(symbol);

  return (
<div style={{
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
  textAlign: 'center'
}}>
  <Image src={logoUrl} alt={`${name} logo`} width={32} height={32} />
  <div style={{ marginTop: '8px' }}> {/* Adjusted margin for spacing */}
    <h3 style={{ fontSize: '14px', margin: '4px 0' }}>{name}</h3> {/* Reduced font size */}
    <p style={{ fontSize: '12px', margin: '2px 0' }}>{symbol}</p> {/* Reduced font size */}
    {isLoading && <p style={{ fontSize: '12px', margin: '2px 0' }}>Loading...</p>} {/* Reduced font size */}
    {isError && <p style={{ fontSize: '12px', margin: '2px 0' }}>Error</p>} {/* Reduced font size */}
    {price !== undefined && <p style={{ fontSize: '12px', margin: '2px 0' }}>${price.toFixed(2)}</p>} {/* Reduced font size */}
  </div>
</div>

  );
}