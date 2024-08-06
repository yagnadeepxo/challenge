import React from 'react';
import { useWalletConnect } from '../hooks/useWallet';
import { usePortfolioBalance } from '../hooks/usePortfolioBalance';
import { useTransactionHistory } from '../hooks/useWalletHistory';
import { useNFTBalance } from '../hooks/useNftBalance';

export const Account = () => {
  const { account, connectWallet } = useWalletConnect();
  const { data: balance, isLoading: isBalanceLoading } = usePortfolioBalance(account || '');
  const { data: transactionHistory, isLoading: isTransactionHistoryLoading } = useTransactionHistory(account || '');
  const { data: nftBalance, isLoading: isNFTBalanceLoading } = useNFTBalance(account || '');

  if (!account) {
    return (
      <div>
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    );
  }

  if (isBalanceLoading || isTransactionHistoryLoading || isNFTBalanceLoading) {
    return <div>Loading account data...</div>;
  }

  return (
    <div>
      <h2>Account: {account.slice(0, 6)}...{account.slice(-4)}</h2>
      
      <h3>Token Balances</h3>
      <ul>
        {balance?.map((token, index) => (
          <li key={index}>
            {token.tokenAddress}: {token.balance}
          </li>
        ))}
      </ul>

      <h3>NFT Balances</h3>
      <ul>
        {nftBalance?.map((nft, index) => (
          <li key={index}>
            {nft.name} (ID: {nft.token_id}): {nft.amount}
          </li>
        ))}
      </ul>

      <h3>Recent Transactions</h3>
      <ul>
        {transactionHistory?.slice(0, 5).map((tx, index) => (
          <li key={index}>
            {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)} | 
            From: {tx.from_address_label || tx.from_address.slice(0, 6)} | 
            To: {tx.to_address_label || tx.to_address.slice(0, 6)} | 
            Value: {tx.value}
          </li>
        ))}
      </ul>
    </div>
  );
};
