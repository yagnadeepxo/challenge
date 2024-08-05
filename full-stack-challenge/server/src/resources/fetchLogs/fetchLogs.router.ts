import express from 'express';
import { FetchLogsController } from './fetchLogs.controller';

const fetchLoggerRouter = express.Router();
fetchLoggerRouter.get("/", (req, res)=> FetchLogsController.fetchLogs(req, res))

export default fetchLoggerRouter;