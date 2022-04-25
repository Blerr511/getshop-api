import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

export class WalletResponse {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  static from(payload: WalletResponse): WalletResponse {
    return plainToClass(WalletResponse, payload);
  }
}
