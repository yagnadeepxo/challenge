import { Request, Response } from 'express';
import { PumpService } from './pump.service';
import { Pump } from '../../models/pump';

export class PumpController {
  private pumpService: PumpService;

  constructor() {
    this.pumpService = new PumpService();
  }

  // Create Token Method
  async createToken(req: Request, res: Response): Promise<void> {
    try {
      const { name, symbol } = req.body;

      const tokenData: Omit<Pump, 'id'> = {
        name,
        symbol,
        totalSupply: 1000000, 
        availableSupply: 1000000, 
        price: 0.01, 
        marketCap: 1000000 * 0.01, 
        createdAt: new Date()
      };

      const newToken = await this.pumpService.createPump(tokenData);
      console.log(newToken);
      res.status(201).json(newToken);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating token' });
    }
  }

  async fetchPump(req: Request, res: Response): Promise<void> {
    try {
      const tokens = await this.pumpService.fetchPump();
      res.status(200).json(tokens);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
