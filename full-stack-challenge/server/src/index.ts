import express from 'express'
import cors from 'cors';
import priceRouter from './resources/price/price.router';
import tokenRouter from './resources/token/token.router';
import accountRouter from './resources/account/account.router';
import loggerRouter from './resources/logger/logger.router';
import fetchLoggerRouter from './resources/fetchLogs/fetchLogs.router';
import fetchNftRouter from './resources/fetchNfts/fetchNft.router';
import fetchHoldingsRouter from './resources/fetchHoldings/fetchHoldings.router';
import pumpRouter from './resources/pump/pump.router';
import orderRouter from './resources/order/order.router';

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
app.use('/pump', pumpRouter);
app.use('/pump', pumpRouter);
app.use('/pump', pumpRouter);
app.use('/api/pump', orderRouter);

app.listen(3001,()=>{
    console.log("server up at port 3001")
})