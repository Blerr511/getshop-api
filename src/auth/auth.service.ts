import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '@modules/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import {
  AccessMode,
  LoginInfo,
  SignUpParams,
  TokenPayload,
} from './auth.types';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenService } from './services/AccessToken.service';
import { RefreshTokenService } from './services/RefreshToken.service';
import { FailedSignInError } from '@shared/errors/NotFound/FailedSignIn.error';

@Injectable()
export class AuthService {
  @InjectRepository(User) private readonly usersRepo: Repository<User>;

  private readonly logger = new Logger(AuthService.name);
  private readonly saltOrRounds = bcrypt.genSaltSync(10);

  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async signUp(signupDetails: SignUpParams): Promise<User> {
    const user = this.usersRepo.create({
      name: signupDetails.name,
      phoneNumber: signupDetails.phoneNumber,
      email: signupDetails.email,
      password: await bcrypt.hash(signupDetails.password, this.saltOrRounds),
    });
    return this.usersRepo.save(user);
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersRepo.findOne({
      where: { email: email },
    });

    if (!user) throw new FailedSignInError();

    if (user && bcrypt.compare(password, user.password)) {
      const accessToken = await this.accessTokenService.getToken({
        user: {
          email: user.email,
          id: user.id,
        },
      });

      const expiresAt = await this.accessTokenService.getExpiry(accessToken);

      const refreshToken = await this.refreshTokenService.getToken({
        user: {
          email: user.email,
          id: user.id,
        },
      });

      return { accessToken, expiresAt, refreshToken };
    } else {
      return 'Something went wrong';
    }
  }
}
