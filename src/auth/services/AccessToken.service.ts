import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetConfigService } from '@modules/config/get-config.service';
import { JwtTokenService } from '@shared/utils/JwtTokenService/JwtTokenService.abstract';
import { AccessTokenPayload } from '../auth.types';

@Injectable()
export class AccessTokenService extends JwtTokenService<AccessTokenPayload> {
  readonly secret: string;
  readonly expirationTime = this.configService.AppEnv.isDev()
    ? 24 * 60 * 60
    : 15 * 60;

  constructor(
    readonly jwtService: JwtService,
    private readonly configService: GetConfigService,
  ) {
    super();
    this.secret = this.configService.safeGet('ACCESS_TOKEN_JWT_SECRET');
  }
}
