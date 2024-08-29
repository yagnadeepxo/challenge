import express from 'express';
import { PumpController } from './pump.controller';

const pumpRouter = express.Router();
const pumpController = new PumpController();

pumpRouter.post('/', pumpController.createToken.bind(pumpController));
pumpRouter.get('/', (req, res) => pumpController.fetchPump(req, res));

pumpRouter.get('/:symbol', (req, res) => pumpController.getTokenBySymbol(req, res));

export default pumpRouter;