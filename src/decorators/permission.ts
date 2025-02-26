import { Reflector } from '@nestjs/core';
import { UserPermission } from '../modules/user/user.enums';

export const Permission = Reflector.createDecorator<UserPermission>();
