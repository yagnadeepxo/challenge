import FetchNftController from "./fetchNft.controller";
import router from 'express';

const fetchNftRouter = router();

fetchNftRouter.get("/:address", (req, res)=>FetchNftController.getNft(req, res));
export default fetchNftRouter;