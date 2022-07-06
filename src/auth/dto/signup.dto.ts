import {
  IsString,
  IsEmail,
  IsLowercase,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '@shared/decorators/match.decorator';
import { ErrorList } from '@modules/common/error-list';

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
  @Match('password', { message: ErrorList.passwordMatch })
  readonly confirmPassword: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly sub?: string;
}
