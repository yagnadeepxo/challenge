'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      setError("MetaMask is not installed");
      return;
    }

    try {
      // Check if we're on the Ethereum mainnet
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt(1)) { 
        setError("Please connect to Ethereum mainnet");
        return;
      }

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setError(null);
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      if (error.code === 4001) {
        setError("Connection request rejected. Please try again.");
      } else {
        setError("Failed to connect wallet. Please try again.");
      }
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}