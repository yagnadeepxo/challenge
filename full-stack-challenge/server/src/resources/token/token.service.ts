import { prisma } from '../../lib/prisma';
import { Token } from '../../models/token';

export class TokenService {
  async createToken(tokenData: Token): Promise<Token> {
    return prisma.token.create({
      data: tokenData,
    });
  }
}