import { FetchLogsService } from "./fetchLogs.service";
export class FetchLogsController {
    static async fetchLogs(req, res) {
        try {
            const logs = await prisma.logger.findMany();
            res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tokens' });
        }
    }
}