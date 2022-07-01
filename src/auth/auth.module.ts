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
import { OidcAuthController } from './controllers/oidc-auth.controller';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { PassportSerializer } from './serializers/passport.serializer';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (
    authService: AuthService,
    configService: GetConfigService,
  ) => {
    await Issuer.discover(configService.safeGet('OIDC_ISSUER'));
    const client = await buildOpenIdClient(configService);
    return new OidcStrategy(authService, client, configService);
  },
  inject: [AuthService, GetConfigService],
};

export const buildOpenIdClient = async (configService: GetConfigService) => {
  const TrustIssuer = await Issuer.discover(
    configService.safeGet('OIDC_ISSUER'),
  );
  return new TrustIssuer.Client({
    client_id: configService.safeGet('CLIENT_ID'),
    client_secret: configService.safeGet('CLIENT_SECRET'),
  });
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
    JwtStrategy,
    PassportSerializer,
  ],
  controllers: [AuthController, OidcAuthController],
})
export class AuthModule {}
