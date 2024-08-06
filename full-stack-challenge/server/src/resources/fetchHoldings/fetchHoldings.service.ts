import axios from "axios";
import { config } from "dotenv";
config();

export default class FetchHoldingsService {
    private static apiUrl = 'https://deep-index.moralis.io/api/v2.2/wallets';
    private static apiKey = process.env.MORALIS_API_KEY;
    static async getHoldings(address: string) {
        const response = await axios.get(`${this.apiUrl}/${address}/history`,{
            headers: {
                'X-API-Key': this.apiKey,
            },
        });
        return response.data;
    }
}