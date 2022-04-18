/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/entities/user.entity';
import { AccessTokenService } from './services/AccessToken.service';
import { RefreshTokenService } from './services/RefreshToken.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@modules/config/config.module';
import { RefreshToken } from '@modules/entities/refresh-token.entity';
import { PassportModule } from '@nestjs/passport';
import { OidcStrategy } from './strategies/oidc.strategy';
import { Issuer } from 'openid-client';
import { GetConfigService } from '@modules/config/get-config.service';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (
    authService: AuthService,
    configService: GetConfigService,
  ) => {
    await Issuer.discover(configService.safeGet('OIDC_ISSUER'));
    const client = await buildOpenIdClient(configService);
    const strategy = new OidcStrategy(authService, client, configService);
    return strategy;
  },
  inject: [AuthService, GetConfigService],
};
export const buildOpenIdClient = async (configService: GetConfigService) => {
  const TrustIssuer = await Issuer.discover(
    configService.safeGet('OIDC_ISSUER'),
  );
  const client = new TrustIssuer.Client({
    client_id: configService.safeGet('CLIENT_ID'),
    client_secret: configService.safeGet('CLIENT_SECRET'),
  });
  return client;
};

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    ConfigModule,
    JwtModule.register({}),
    PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
  ],
  providers: [
    OidcStrategyFactory,
    AuthService,
    AccessTokenService,
    RefreshTokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
