import { User } from '@modules/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Strategy,
  Client,
  UserinfoResponse,
  TokenSet,
  Issuer,
} from 'openid-client';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const buildOpenIdClient = async () => {
  const TrustIssuer = await Issuer.discover('https://trial-7840345.okta.com');
  const client = new TrustIssuer.Client({
    client_id: '0oaovbggqkE2Rb3Qe696',
    client_secret: 'CpF73KCD5vKJZh5FCRn_-OhwcxTy4QXHA3fjvh84',
  });
  return client;
};

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  client: Client;

  constructor(private readonly authService: AuthService, client: Client) {
    super({
      client: client,
      params: {
        redirect_uri: 'http://localhost:4000/api/auth/callback',
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

      // const id_token = tokenset.id_token;
      // const access_token = tokenset.access_token;
      // const refresh_token = tokenset.refresh_token;
      // const user = {
      //   id_token,
      //   access_token,
      //   refresh_token,
      //   userinfo,
      // };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
