import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../app.types';
import { UserModel } from '../database/postgres/entities';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserModel => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();

  return request.user;
});
