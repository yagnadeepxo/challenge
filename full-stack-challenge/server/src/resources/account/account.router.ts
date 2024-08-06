import AccountController from "./account.controller";
import router from 'express'

const accountRouter = router();

const accountController = new AccountController();

accountRouter.get("/:address", (req, res) => accountController.getTokenBalances(req, res));

export default accountRouter;