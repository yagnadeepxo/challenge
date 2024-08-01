// import { AccountService } from "./account.service"
// import TokenModel from '../../models/tokenModel'

// class AccountController {
//   async getTokens(req, res) {
//     try {
//       const accountService = new AccountService();
//       const { address } = req.query;
      
//       // Ensure that getWalletTokenBalances returns an array
//       const tokenBalancesResponse = await accountService.getWalletTokenBalances(address);
      
//       // If tokenBalancesResponse is not an array, convert it to one
//       const tokenBalances = Array.isArray(tokenBalancesResponse) 
//         ? tokenBalancesResponse 
//         : ([]);

//       const tokenPrices = await Promise.all(
//         tokenBalances.map((tokenBalance) =>
//           accountService.getTokenPrice(tokenBalance.token_address)
//         )
//       );

//       const tokens = tokenBalances.map((tokenBalance, index) =>
//         new TokenModel(tokenBalance, tokenPrices[index])
//       );

//       const totalWalletUsdValue = tokens.reduce(
//         (acc, token) => acc + token.calculatedBalance * token.usdPrice,
//         0
//       );

//       return res.status(200).json([...tokens, { totalWalletUsdValue }]);
//     } catch (e) {
//       console.log(`Something went wrong ${e}`);
//       return res.status(400).json({ error: e.message });
//     }
//   }
// }

// export default AccountController;

// controller.ts
import { Request, Response } from 'express';
import AccountService from './account.service';

class AccountController {
  
  private accountService = new AccountService();

  async getTokenBalances(req: Request, res: Response) {
    try {
      const address = req.params.address;
      const tokenBalances = await this.accountService.getTokenBalances(address);
      res.json(tokenBalances);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch token balances' });
    }
  }
}

export default AccountController;