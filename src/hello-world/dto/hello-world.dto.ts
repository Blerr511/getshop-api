import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HelloWorldDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Gago Smith',
  })
  name: string;
}

export class RegisterPaymentQueryDto {
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
