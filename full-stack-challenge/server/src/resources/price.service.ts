import axios from 'axios';

export class PriceService {
  async getPrice(symbol: string): Promise<number> {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
      const price = response.data[symbol].usd;
      return price;
    } catch (error) {
      throw new Error(error);
    }
  }
}