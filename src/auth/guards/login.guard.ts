import { ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OIDCAuthGuard extends AuthGuard('oidc') {
  canActivate = async (context: ExecutionContext) => {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  };
}

export const OIDCAuth = () => UseGuards(OIDCAuthGuard);
