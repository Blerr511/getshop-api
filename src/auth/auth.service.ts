import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '@modules/entities/user.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpParams, TokenPayload, UserDto } from './auth.types';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenService } from './services/AccessToken.service';
import { RefreshTokenService } from './services/RefreshToken.service';
import { ErrorList } from '@modules/common/error-list';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly usersRepo: Repository<User>;

  private readonly logger = new Logger(AuthService.name);
  private readonly saltOrRounds = bcrypt.genSaltSync(10);

  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async signUp(signupDetails: SignUpParams): Promise<User> {
    const checkUSer = await this.usersRepo.findOne({
      email: signupDetails.email,
    });
    if (checkUSer) {
      throw new ConflictException(ErrorList.existingUser);
    }
    if (signupDetails.password !== signupDetails.confirmPassword) {
      throw new BadRequestException(ErrorList.passwordMatch);
    }
    const user = this.usersRepo.create({
      ...signupDetails,
      password: await bcrypt.hash(signupDetails.password, this.saltOrRounds),
    });

    return this.usersRepo.save(user);
  }

  async signIn(email: string, password: string): Promise<TokenPayload> {
    const user = await this.usersRepo.findOne({
      where: { email: email },
    });

    if (user && bcrypt.compare(password, user.password)) {
      return this.createToken(user);
    } else {
      throw new UnauthorizedException(`Login or Password is not correct`);
    }
  }

  async createToken(user: User): Promise<TokenPayload> {
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
