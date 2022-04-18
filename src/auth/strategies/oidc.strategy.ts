import { GetConfigService } from '@modules/config/get-config.service';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Client, UserinfoResponse, TokenSet } from 'openid-client';
import { AuthService } from '../auth.service';

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  client: Client;

  constructor(
    private readonly authService: AuthService,
    client: Client,
    configService: GetConfigService,
  ) {
    super({
      client: client,
      params: {
        redirect_uri: configService.safeGet('REDIRECT_URL'),
        scope: 'openid profile',
      },
      passReqToCallback: false,
      usePKCE: false,
    });

    this.client = client;
  }

  async validate(tokenset: TokenSet): Promise<any> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenset);

    try {
      let user = await this.authService.getUserBySub(userinfo.sub);

      if (!user) {
        user = await this.authService.createUser({
          name: userinfo.name,
          email: userinfo.email,
          sub: userinfo.sub,
        });
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
