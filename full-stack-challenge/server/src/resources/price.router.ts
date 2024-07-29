import Router from 'express'
import { PriceController } from './price.controller'

const router = Router();
const priceController = new PriceController();
router.get('/:symbol', (req, res) => priceController.getPrice(req, res))
export default router;