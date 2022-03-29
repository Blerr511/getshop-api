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
import { OidcStrategy, buildOpenIdClient } from './strategies/oidc.strategy';
import { SessionSerializer } from './serializers/session.serializer';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (authService: AuthService) => {
    const client = await buildOpenIdClient();
    const strategy = new OidcStrategy(authService, client);
    return strategy;
  },
  inject: [AuthService],
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
    SessionSerializer,
    AuthService,
    AccessTokenService,
    RefreshTokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
