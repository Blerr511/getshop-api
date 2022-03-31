import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  Client,
  UserinfoResponse,
  TokenSet,
  Issuer,
} from 'openid-client';
import { AuthService } from '../auth.service';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const buildOpenIdClient = async () => {
  const TrustIssuer = await Issuer.discover('https://trial-7840345.okta.com');
  const client = new TrustIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
  return client;
};

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  client: Client;

  constructor(private readonly authService: AuthService, client: Client) {
    super({
      client: client,
      params: {
        redirect_uri: process.env.REDIRECT_URL,
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
          email: userinfo.preferred_username,
          sub: userinfo.sub,
        });
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
