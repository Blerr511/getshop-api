import { ApiProperty } from '@nestjs/swagger';
import { User } from '@modules/entities/user.entity';
import * as faker from 'faker';
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

  @ApiProperty({ example: faker.datatype.uuid() })
  accessToken: string;

  @ApiProperty({ example: faker.datatype.uuid() })
  refreshToken: string;

  @ApiProperty({ example: faker.date.future().getTime() })
  expiresAt: number;
}
