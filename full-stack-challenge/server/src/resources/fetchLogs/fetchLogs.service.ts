export class FetchLogsService {
    static async fetchLogs() {
        const logs = await prisma.logger.findMany();
        return logs
    }
}