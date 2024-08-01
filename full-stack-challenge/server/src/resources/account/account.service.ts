// import Moralis from 'moralis';

// export class AccountService {
//   async getWalletTokenBalances(address) {
//     return await Moralis.EvmApi.token.getWalletTokenBalances({
//       address,
//       chain: "0x1",
//     });
//   }

//   async getTokenPrice(address) {
//     return await Moralis.EvmApi.token.getTokenPrice({
//       address,
//       chain: "0x1",
//     });
//   }
// }

// export default module.exports = AccountService;

// service.ts
import axios from 'axios';
import { config } from 'dotenv';
config(); 

interface TokenBalance {
  tokenAddress: string;
  balance: string;
}

class AccountService {
  private apiUrl = 'https://deep-index.moralis.io/api/v2';
  private apiKey = process.env.MORALIS_API_KEY;
  async getTokenBalances(address: string): Promise<TokenBalance[]> {
    const response = await axios.get(`${this.apiUrl}/${address}/erc20`, {
      headers: {
        'X-API-Key': this.apiKey,
      },
    });
    return response.data;
  }
}

export default AccountService;