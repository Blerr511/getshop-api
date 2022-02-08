import { User } from '@modules/entities/user.entity';
import { ITokenPayload } from '@shared/utils/JwtTokenService/JwtTokenService.abstract';

export interface SignUpParams {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export enum AccessMode {
  GOD = 'GOD',
  NORMAL = 'NORMAL',
}

export interface AccessTokenPayload extends ITokenPayload {
  user: {
    id: number;
    email: string;
  };
}

export interface RefreshTokenPayload extends ITokenPayload {
  user: {
    id: number;
    email: string;
  };
}

export class LoginInfo {
  constructor(readonly user: User) {}
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}
