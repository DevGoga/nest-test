import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestWithUser } from '../app.types';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

    const payload = await this.authService.decode(accessToken);

    if (!payload) {
      throw new UnauthorizedException();
    }

    request.user = await this.userService.findUserById(payload.id);

    return true;
  }
}
