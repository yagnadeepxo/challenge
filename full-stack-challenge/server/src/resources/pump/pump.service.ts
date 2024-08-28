import { prisma } from '../../lib/prisma';
import { Pump } from '../../models/pump';

export class PumpService {
    async createPump(tokenData: Pump): Promise<Pump> {
        return prisma.pump.create({
            data : tokenData
        });
    }

    async fetchPump(): Promise<Pump[]> {
        return prisma.pump.findMany(); 
      }
}