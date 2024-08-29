import { Request, Response } from 'express';
import { buyTokens, sellTokens } from './order.service';

export const buy = async (req: Request, res: Response) => {
  const { symbol, amount } = req.body;

  if (!symbol || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid symbol or amount' });
  }

  try {
    const pump = await buyTokens(symbol, amount);
    res.status(200).json(pump);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sell = async (req: Request, res: Response) => {
  const { symbol, amount } = req.body;

  if (!symbol || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid symbol or amount' });
  }

  try {
    const pump = await sellTokens(symbol, amount);
    res.status(200).json(pump);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
