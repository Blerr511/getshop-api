import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '@modules/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { SignUpParams, UserDto } from './auth.types';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenService } from './services/AccessToken.service';
import { RefreshTokenService } from './services/RefreshToken.service';

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

    if (user && bcrypt.compare(password, user.password)) {
      return this.createToken(user);
    }
  }

  async createToken(user: User): Promise<any> {
    const accessToken = await this.accessTokenService.getToken({
      user: {
        email: user.email,
        id: user.id,
      },
    });

    const expiresAt = this.accessTokenService.getExpiry(accessToken);

    const refreshToken = await this.refreshTokenService.getToken({
      user: {
        email: user.email,
        id: user.id,
      },
    });

    return { accessToken, expiresAt, refreshToken };
  }

  async createUser(userDto: UserDto): Promise<User> {
    const user = await this.usersRepo.save(
      this.usersRepo.create({ ...userDto }),
    );

    return this.usersRepo.findOneOrFail(user.id);
  }

  async getUserById(userId: number): Promise<User> {
    return this.usersRepo.findOne(userId);
  }

  async getUserBySub(sub: string): Promise<User> {
    return this.usersRepo.findOne({ where: { sub } });
  }
}
