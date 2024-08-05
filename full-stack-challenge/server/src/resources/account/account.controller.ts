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