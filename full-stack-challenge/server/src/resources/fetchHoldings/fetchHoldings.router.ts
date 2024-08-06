import FetchHoldingsController from "./fetchHoldings.controller";
import router from 'express';
const fetchHoldingsRouter = router();

fetchHoldingsRouter.get("/:address", (req,res)=>FetchHoldingsController.getHoldings(req, res));
export default fetchHoldingsRouter;