/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Res, Get, Req, Controller } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { Request, Response } from 'express';

import { User, UserInfo } from '@shared/decorators/User';
import { OIDCAuth } from '../guards/login.guard';
import { GetConfigService } from '@modules/config/get-config.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth openid connect')
@Controller('auth/oidc')
export class OidcAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: GetConfigService,
  ) {}

  @OIDCAuth()
  @Get('/login')
  login() {}

  @Get('/token')
  user(@User() user: UserInfo) {
    return this.authService.createToken(user);
  }

  @OIDCAuth()
  @Get('/callback')
  loginCallback(@Req() req: Request & { user: any }, @Res() res: Response) {
    res.redirect(this.configService.safeGet('CLIENT_AUTH_CALLBACK_URI'));
  }
}
