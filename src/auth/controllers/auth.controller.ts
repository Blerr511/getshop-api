/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Controller,
  Res,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { SignUpDto } from '../dto/signup.dto';
import { AuthService } from '../auth.service';
import { SignUpResponse } from '../responses/auth.response';
import { SignInDto } from '../dto/signin.dto';

import { Request, Response } from 'express';

import { LoginGuard } from '../guards/login.guard';
import { User, UserInfo } from '@shared/decorators/User';

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
    status: 200,
    type: SignInDto,
  })
  async signIn(@Body() dto: SignInDto): Promise<any> {
    const res = await this.authService.signIn(dto.email, dto.password);
    return res;
  }

  @UseGuards(LoginGuard)
  @Get('/login')
  login() {}

  @Get('/token')
  user(@User() user: UserInfo) {
    return this.authService.createToken(user);
  }

  @UseGuards(LoginGuard)
  @Get('/callback')
  loginCallback(@Req() req: Request & { user: any }, @Res() res: Response) {
    res.redirect('http://localhost:3000/auth');
  }
}
