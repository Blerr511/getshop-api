import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GetConfigService } from '@modules/config/get-config.service';
import { AccessTokenPayload, LoginInfo } from '../auth.types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly configService: GetConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.safeGet('ACCESS_TOKEN_JWT_SECRET'),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<LoginInfo> {
    const {
      user: { id },
    } = payload;
    try {
      const user = await this.usersRepo.findOneOrFail({
        where: { id },
      });

      return new LoginInfo(user);
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException();
    }
  }
}
