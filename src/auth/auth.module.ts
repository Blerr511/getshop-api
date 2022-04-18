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
import { ConfigService } from '@nestjs/config';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (
    authService: AuthService,
    configService: ConfigService,
  ) => {
    const TrustIssuer = await Issuer.discover(configService.get('OIDC_ISSUER'));
    const client = await buildOpenIdClient();
    const strategy = new OidcStrategy(authService, client);
    return strategy;
  },
  inject: [AuthService, ConfigService],
};

export const buildOpenIdClient = async () => {
  const TrustIssuer = await Issuer.discover(process.env.OIDC_ISSUER);
  const client = new TrustIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
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
