import express from 'express';

import LoggerController from './logger.controller';

const loggerRouter = express.Router();

loggerRouter.post("/", LoggerController.createLog.bind(LoggerController));

export default loggerRouter;



