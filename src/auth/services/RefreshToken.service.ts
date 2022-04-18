import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetConfigService } from '@modules/config/get-config.service';
import { RefreshToken } from '@modules/entities/refresh-token.entity';
import { JwtTokenService } from '@shared/utils/JwtTokenService/JwtTokenService.abstract';
import { RefreshTokenPayload } from '../auth.types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RefreshTokenService extends JwtTokenService<RefreshTokenPayload> {
  readonly secret: string;
  readonly expirationTime = 24 * 60 * 60;

  readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    readonly jwtService: JwtService,
    private readonly configService: GetConfigService,
  ) {
    super();
    this.secret = this.configService.safeGet('REFRESH_TOKEN_JWT_SECRET');
  }

  async save(refreshToken: string, deleteBefore = true): Promise<void> {
    const { user } = await this.decode(refreshToken);
    const token = new RefreshToken();

    token.userId = user.id;
    token.expireDate = new Date(this.getExpiry(refreshToken) * 1000);
    token.token = await bcrypt.hash(refreshToken);

    if (deleteBefore) {
      try {
        await this.delete(user.id);
      } catch (error) {
        this.logger.error(error);
      }
    }

    await this.refreshTokenRepo.insert(token);
  }

  async validate(userId: number, refreshToken: string): Promise<any> {
    const token = await this.refreshTokenRepo.findOneOrFail({
      where: { userId },
    });

    const isCorrect = await bcrypt.compare(refreshToken, token.token);

    if (!isCorrect) throw new NotFoundException();

    return token;
  }

  async delete(userId: number): Promise<any> {
    await this.refreshTokenRepo
      .createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .execute();
  }
}
