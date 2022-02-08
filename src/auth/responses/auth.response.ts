import { plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponse {
  @ApiProperty({
    example: 'Success',
  })
  name: string;

  @ApiProperty({
    example: 'Success',
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'Success',
  })
  email: string;

  @ApiProperty({
    example: 'Success',
  })
  password: string;

  static from(payload: SignUpResponse): SignUpResponse {
    return plainToClass(SignUpResponse, payload);
  }
}
