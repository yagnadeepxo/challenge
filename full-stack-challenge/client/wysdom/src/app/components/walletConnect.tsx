import React from 'react';
import { useWalletConnect } from '../hooks/useWallet';


export default function WalletConnect(){
  const { account, connectWallet, error } = useWalletConnect();

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};