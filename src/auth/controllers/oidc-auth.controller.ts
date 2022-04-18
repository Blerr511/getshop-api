import { Res, Get, Req } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { Request, Response } from 'express';

import { User, UserInfo } from '@shared/decorators/User';
import { OIDCAuth } from '../guards/login.guard';

export class OidcAuthController {
  constructor(private readonly authService: AuthService) {}

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
    res.redirect(process.env.OIDC_ISSUER);
  }
}
