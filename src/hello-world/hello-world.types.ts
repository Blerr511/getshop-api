import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface GetHelloWorldParams {
  name: string;
}

export class RegisterPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1000 })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
  })
  orderNumber: string;
}
