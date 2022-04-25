import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WalletCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  walletJson: string;
}
