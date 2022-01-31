import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HelloWorldDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Gago Smith',
  })
  name: string;
}
