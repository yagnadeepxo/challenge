import { Request, Response } from 'express';
import FetchNftService from './fetchNFT.service';

export default class FetchNftController {
    static async getNft(req: Request, res: Response) {
        try {
            const address = req.params.address;
            const NftBalances = await FetchNftService.getNftbalances(address);
            res.json(NftBalances);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch NFT balances' });
        }
    }
}