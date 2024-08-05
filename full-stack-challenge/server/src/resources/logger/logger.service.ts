import { prisma } from '../../lib/prisma';
export default class LoggerService {
static createLog = async (logData) => {
        return await prisma.logger.create({
        data: logData,
        });
    };
}