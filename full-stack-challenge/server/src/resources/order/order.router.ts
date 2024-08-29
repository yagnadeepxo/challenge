import { Router } from 'express';
import { buy, sell } from './oder.controller';

const orderRouter = Router();

orderRouter.post('/buy', buy);
orderRouter.post('/sell', sell);

export default orderRouter;