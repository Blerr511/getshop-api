import { plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@modules/entities/user.entity';

export class SignUpResponse {
  @ApiProperty({
    example: 'Jon',
  })
  name: string;

  @ApiProperty({
    example: '37498765432',
  })
  phoneNumber?: string;

  @ApiProperty({
    example: 'jon.smith@mail.com',
  })
  email?: string;

  @ApiProperty({
    example: 'Success',
  })
  password?: string;

  static from(payload: User): SignUpResponse {
    return plainToClass(SignUpResponse, payload);
  }
}
