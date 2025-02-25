import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestWithUser } from '../app.types';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    if (context.getType() !== 'http') {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const header = request.headers['authorization'];

    if (!header) {
      throw new UnauthorizedException();
    }

    const [, accessToken] = header.split(' ');

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.decode(accessToken, 'access');

    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return true;
  }
}
