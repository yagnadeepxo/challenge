import React from 'react';
import { useWalletConnect } from '../hooks/useWallet';
import { usePortfolioBalance } from '../hooks/usePortfolioBalance';
import WalletConnect from './walletConnect';

export const Account = () => {
  const { account, connectWallet } = useWalletConnect();
  //let account = "0xFd91967c58BC4e38B54EDEC9b6aD3366A93244FB"
  const { data: balance, isLoading } = usePortfolioBalance(account || '');

  if (!account) {
    return (
      <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading portfolio data...</div>;
  }

  return (
    <div>
      <h2>Token Balances for {account}</h2>
      <ul>
        {balance?.map((token, index) => (
          <li key={index}>
            {token.tokenAddress}: {token.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};
