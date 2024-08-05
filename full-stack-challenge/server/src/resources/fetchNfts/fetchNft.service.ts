import axios from "axios";
import { config } from "dotenv";
config();

export default class FetchNftService {
    private static apiUrl = 'https://deep-index.moralis.io/api/v2.2/';
    private static apiKey = process.env.MORALIS_API_KEY;
    static async getNftbalances(address: string) {
        const response = await axios.get(`${this.apiUrl}/${address}/nft`,{
            headers: {
                'X-API-Key': this.apiKey,
            },
        });
        return response.data;
    }
}