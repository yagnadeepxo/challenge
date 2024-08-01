import {Request, Response} from 'express';
import { PriceService } from './price.service';

export class PriceController {
    private priceService: PriceService;
  
    constructor() {
      this.priceService = new PriceService();
    }
  
    async getPrice(req: Request, res: Response) {
      try {
        const { symbol } = req.params;
        const price = await this.priceService.getPrice(symbol);
        res.json({ price });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the price' });
      }
    }
}