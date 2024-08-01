import express from 'express'
import cors from 'cors';
import priceRouter from './resources/price/price.router';
import tokenRouter from './resources/token/token.router';
import accountRouter from './resources/account/account.router';

const app = express();
app.use(cors());
const port = 3001;
app.use(express.json());
app.use('/token', priceRouter);
app.use('/create', tokenRouter);
app.use('/', accountRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});