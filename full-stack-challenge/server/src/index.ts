import express from 'express'
import cors from 'cors';
import priceRouter from './resources/price/price.router';
import tokenRouter from './resources/token/token.router';
import accountRouter from './resources/account/account.router';
import loggerRouter from './resources/logger/logger.router';
import fetchLoggerRouter from './resources/fetchLogs/fetchLogs.router';
import fetchNftRouter from './resources/fetchNfts/fetchNft.router';
import fetchHoldingsRouter from './resources/fetchHoldings/fetchHoldings.router';

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());
app.use('/token', priceRouter);
app.use('/create', tokenRouter);
app.use('/token-balances', accountRouter);
app.use('/logger', loggerRouter);
app.use('/logger', fetchLoggerRouter);
app.use('/nft', fetchNftRouter);
app.use('/history', fetchHoldingsRouter);

export default app;