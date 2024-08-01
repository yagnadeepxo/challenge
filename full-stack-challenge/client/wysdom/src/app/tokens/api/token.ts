import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, symbol, imageURL, address, decimals, ticker } = req.body;
      
      const token = await prisma.token.create({
        data: {
          name,
          symbol,
          imageURL,
          address,
          decimals,
          ticker,
        },
      });

      res.status(201).json(token);
    } catch (error) {
      console.error('Error creating token:', error);
      res.status(500).json({ error: 'Failed to create token' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}