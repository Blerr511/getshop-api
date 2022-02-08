import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/entities/user.entity';
import { AccessTokenService } from './services/AccessToken.service';
import { RefreshTokenService } from './services/RefreshToken.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@modules/config/config.module';
import { RefreshToken } from '@modules/entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    ConfigModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, AccessTokenService, RefreshTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
