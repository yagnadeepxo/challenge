import express from 'express';
import { TokenController } from './token.controller';

const tokenRouter = express.Router();
const tokenController = new TokenController();

tokenRouter.post('/', tokenController.createToken.bind(tokenController));

export default tokenRouter;