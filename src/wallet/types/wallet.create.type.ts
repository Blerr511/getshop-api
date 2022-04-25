import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WalletCreateType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  walletJson: string;
}
