import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from '../app.types';
import { Permission } from '../decorators';
import { UserPermission } from '../modules/user/user.enums';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.get<UserPermission>(Permission, context.getHandler());
    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userPermission = request.user.permission;

    if (requiredPermission === UserPermission.admin && userPermission !== UserPermission.admin) {
      throw new ForbiddenException("You don't have permission");
    }

    return true;
  }
}
