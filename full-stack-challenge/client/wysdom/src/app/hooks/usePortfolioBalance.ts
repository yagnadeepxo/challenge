// import { useEffect, useState } from "react";
// import { ethers } from 'ethers';

// export const usePortfolioBalance = (address: string | null) => {
//     const [balance, setBalance] = useState<string | null>(null);
//     const [assets, setAssets] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     useEffect(() => {

//         if (!address) {
//           console.log("No address provided, returning early");
//           return
//         };

//         setIsLoading(true);
//         console.log("Setting isLoading to true");

//         const rpc = "https://eth-mainnet.g.alchemy.com/v2/inDoUGWC9TF7nObt8p9O7oS0jBhc2OgM"
//         const api = "https://tokens.coingecko.com/ethereum/all.json"
//         const provider = new ethers.JsonRpcProvider(rpc);

//         const fetchBalance = async () => {
//             console.log("Fetching ETH balance");  
//             const balance = await provider.getBalance(address);
//             console.log("ETH balance fetched:", balance);
//             setBalance(ethers.formatEther(balance));
//         };

//         const fetchAssets = async () => {
//             const tokenList = await fetch(api);
//             const tokens = await tokenList.json();
      
//             const fetchedAssets: any[] = [];
      
//             for (const token of tokens.tokens) {
//                 try {
//                     const contract = new ethers.Contract(token.address, ['function balanceOf(address) view returns (uint256)'], provider);
//                     const tokenBalance = await contract.balanceOf(address);
//                     if (tokenBalance > BigInt(0)) {
//                         fetchedAssets.push({
//                             symbol: token.symbol,
//                             balance: ethers.formatUnits(tokenBalance, token.decimals),
//                         });
//                     }
//                 } catch (error) {
//                     console.error(`Error fetching balance for token ${token.symbol}:`, error);
//                 }
//             }
//             setAssets(fetchedAssets);
//         };

//         Promise.all([fetchBalance(), fetchAssets()])
//             .then(() => setIsLoading(false))
//             .catch((error) => {
//                 console.error("Error fetching portfolio data:", error);
//                 setIsLoading(false);
//             });

//     }, [address]);

//     return { balance, assets, isLoading };
// };

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

interface TokenBalance {
  tokenAddress: string;
  balance: string;
}

const fetchTokenBalances = async (address: string): Promise<TokenBalance[]> => {
  const response = await axios.get(`http://localhost:3001/${address}/token-balances`);
  return response.data;
};

export const usePortfolioBalance = (address: string) => {
  return useQuery({
    queryKey: ['tokenBalances', address],
    queryFn: () => fetchTokenBalances(address),
    enabled: !!address,
    refetchOnWindowFocus: false,
  });
};