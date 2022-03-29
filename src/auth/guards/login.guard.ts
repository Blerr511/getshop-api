import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('oidc') {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  canActivate = async (context: ExecutionContext) => {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  };
}
