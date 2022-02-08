import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignUpResponse } from './responses/auth.response';
import { SignInDto } from './dto/signin.dto';
import { SignInResponse } from './responses/sing-in.response';
import { LoginInfo } from './auth.types';
import { User } from '@shared/decorators/User';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(200)
  @ApiResponse({
    type: SignUpResponse,
  })
  async signup(@Body() payload: SignUpDto): Promise<SignUpResponse> {
    const user = await this.authService.signUp(payload);

    return SignUpResponse.from(user);
  }

  @Post('sign-in')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SignInDto,
  })
  async signIn(@Body() dto: SignInDto): Promise<any> {
    const res = await this.authService.signIn(dto.email, dto.password);
    return res;
  }
}
