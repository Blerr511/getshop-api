import { IsString, IsEmail, IsLowercase } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsLowercase()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsLowercase()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
