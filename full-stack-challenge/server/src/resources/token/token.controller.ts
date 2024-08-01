import { Request, Response } from 'express';
import { TokenService } from './token.service';
import { Token } from '../../models/token';

export class TokenController {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  async createToken(req: Request, res: Response): Promise<void> {
    try {
      const tokenData: Token = req.body;
      const newToken = await this.tokenService.createToken(tokenData);
      console.log(newToken)
      res.status(201).json(newToken);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}