import {
  IsString,
  IsEmail,
  IsLowercase,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly surname: string;

  @ApiProperty()
  @IsLowercase()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  readonly phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiProperty()
  @IsString()
  readonly confirmPassword: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly sub?: string;
}
