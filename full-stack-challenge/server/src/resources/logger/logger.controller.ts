import { prisma } from '../../lib/prisma';
import LoggerService from './logger.service';
import { Request, Response } from 'express';

class LoggerController {
    static async createLog(req: Request, res: Response): Promise<void> {
        try {
            const {method, endpoint, data} = req.body;
            let logData =   {
                method,
                endpoint,
                data,
            }
            const log = await LoggerService.createLog(logData)
            res.status(201).json({success : true, data: log})
        } catch(error) {
            res.status(400).json({success: false,error: error.message});
        }
    }
}

export default LoggerController;