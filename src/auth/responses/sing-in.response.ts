import { ApiProperty } from '@nestjs/swagger';
import { User } from '@modules/entities/user.entity';
import { plainToClass } from 'class-transformer';

export class SignInResponse {
  static from(
    user: User,
    {
      accessToken,
      expiresAt,
      refreshToken,
    }: { accessToken: string; expiresAt: number; refreshToken: string },
  ): SignInResponse {
    return plainToClass(
      SignInResponse,
      {
        user,
        accessToken,
        refreshToken,
        expiresAt,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }
  @ApiProperty()
  user: User;

  @ApiProperty({ example: 'accessToken' })
  accessToken: string;

  @ApiProperty({ example: 'refreshToken' })
  refreshToken: string;

  @ApiProperty({ example: 'expiresAt' })
  expiresAt: number;
}
