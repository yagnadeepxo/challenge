import FetchNftController from "./fetchNFT.controller";
import router from 'express';

const fetchNftRouter = router();

fetchNftRouter.get("/:address/NftBalance", (req, res)=>FetchNftController.getNft(req, res));
export default fetchNftRouter;