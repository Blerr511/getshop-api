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
import { Issuer } from 'openid-client';
import { clearConfigCache } from 'prettier';
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

  // @Get('/logout')
  // async logout(@Req() req: Request, @Res() res: Response) {
  //   const id_token = req.user ? req.user.id_token : undefined;
  //   req.logout();
  //   req.session.destroy(async (error: any) => {
  //     const TrustIssuer = await Issuer.discover(
  //       `${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`,
  //     );
  //     const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;
  //     if (end_session_endpoint) {
  //       res.redirect(
  //         end_session_endpoint +
  //           '?post_logout_redirect_uri=' +
  //           process.env
  //             .OAUTH2_CLIENT_REGISTRATION_LOGIN_POST_LOGOUT_REDIRECT_URI +
  //           (id_token ? '&id_token_hint=' + id_token : ''),
  //       );
  //     } else {
  //       res.redirect('/');
  //     }
  //   });
  // }
}
