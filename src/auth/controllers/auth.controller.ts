import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { SignUpDto } from '../dto/signup.dto';
import { AuthService } from '../auth.service';
import { SignUpResponse } from '../responses/auth.response';
import { SignInDto } from '../dto/signin.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(201)
  @ApiCreatedResponse({
    type: SignUpResponse,
  })
  async signup(@Body() payload: SignUpDto): Promise<SignUpResponse> {
    const user = await this.authService.signUp(payload);

    return SignUpResponse.from(user);
  }

  @Post('sign-in')
  @HttpCode(200)
  @ApiOkResponse({
    type: SignInDto,
  })
  async signIn(@Body() dto: SignInDto): Promise<any> {
    const res = await this.authService.signIn(dto.email, dto.password);
    return res;
  }
}
