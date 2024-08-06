import { Request, Response } from 'express';
import FetchHoldingsService from './fetchHoldings.service';

export default class FetchHoldingsController {
    static async getHoldings(req:Request, res:Response) {
        try {
            const address = req.params.address;
            const Holdings = await FetchHoldingsService.getHoldings(address);
            res.json(Holdings);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch transaction history' });
        }
    }
}