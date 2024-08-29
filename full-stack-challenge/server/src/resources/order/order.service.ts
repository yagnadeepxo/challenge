import { prisma } from '../../lib/prisma';
export const buyTokens = async (symbol: string, amount: number) => {
    const pump = await prisma.pump.findFirst({ where: { symbol } });
  
    if (!pump) {
      throw new Error('Pump not found');
    }
  
    const c = pump.totalSupply * pump.price;
    const newAvailableSupply = pump.availableSupply - amount;
  
    if (newAvailableSupply < 0) {
      throw new Error('Not enough tokens available');
    }
  
    const newPrice = c / newAvailableSupply;
  
    const updatedPump = await prisma.pump.update({
      where: { id: pump.id },
      data: {
        availableSupply: newAvailableSupply,
        price: newPrice,
        marketCap: newAvailableSupply * newPrice,
      },
    });
  
    return updatedPump;
  };
  
  export const sellTokens = async (symbol: string, amount: number) => {
    const pump = await prisma.pump.findFirst({ where: { symbol } });
  
    if (!pump) {
      throw new Error('Pump not found');
    }
  
    const c = pump.totalSupply * pump.price;
    const newAvailableSupply = pump.availableSupply + amount;
    const newPrice = c / newAvailableSupply;
  
    const updatedPump = await prisma.pump.update({
      where: { id: pump.id },
      data: {
        availableSupply: newAvailableSupply,
        price: newPrice,
        marketCap: newAvailableSupply * newPrice,
      },
    });
  
    return updatedPump;
  };