import Router from 'express'
import { PriceController } from './price.controller'

const priceRouter = Router();
const priceController = new PriceController();
priceRouter.get('/:symbol', (req, res) => priceController.getPrice(req, res))
export default priceRouter;